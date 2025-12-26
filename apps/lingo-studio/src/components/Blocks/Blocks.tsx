import {
  BlockContent,
  BlockWrapper,
  Container,
  IdSeq,
  RightColumn,
  UtilityButtons,
} from "./Blocks.styles";
import { useParams } from "react-router";
import {
  useCreateSentenceSections,
  useFetchBlocks,
  useFetchLang,
  useUpdateBlock,
} from "react-query";
import Sentence from "../Sentence/Sentence.tsx";
import { NewBlockButton } from "../NewBlockButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton } from "@mui/material";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import GrainOutlinedIcon from "@mui/icons-material/GrainOutlined";
import { useState } from "react";
import { UpdateBlockForm } from "../UpdateBlockForm";
import { BlockLocales } from "../BlockLocales";
import { BlockLocaleForm } from "../BlockLocaleForm";

function Blocks() {
  const [updateBlockIndex, setUpdateBlockIndex] = useState<number | null>(null);
  const [localeBlockIndex, setLocaleBlockIndex] = useState<number | null>(null);
  const { chapterId } = useParams();
  const { data: blocks, isLoading } = useFetchBlocks(chapterId);
  const updateBlockMutation = useUpdateBlock(chapterId);
  const createSentenceSectionsMutation = useCreateSentenceSections(chapterId);
  const { data: langOrigin } = useFetchLang();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blocks) {
    return null;
  }

  return (
    <Container>
      <div>BLOCKS</div>
      {blocks && blocks.length > 0 ? (
        <div>
          {blocks?.map((block, index) => (
            <>
              {index === 0 && (
                <NewBlockButton
                  seq={block.seq / 2}
                  chapterId={chapterId}
                  topSeparator={false}
                />
              )}
              {index === updateBlockIndex ? (
                <UpdateBlockForm
                  block={block}
                  setUpdateBlockIndex={setUpdateBlockIndex}
                />
              ) : (
                <BlockWrapper>
                  <BlockContent>
                    {block.contentType === "SENTENCE" ? (
                      <Sentence block={block} />
                    ) : (
                      <div>
                        <strong>Illu. Url:</strong>
                        {block.content as string}
                      </div>
                    )}
                    <IdSeq>
                      <div>
                        <strong>IsDeleted: </strong>
                        {block.isDeleted ? "true" : "false"}
                      </div>
                      <div>
                        <strong>IsPublished: </strong>
                        {block.isPublished ? "true" : "false"}
                      </div>
                      <div>
                        <strong>Id: </strong>
                        {block._id}
                      </div>
                      <div>
                        <strong>Seq: </strong>
                        {block.seq}
                      </div>
                    </IdSeq>
                    {block.contentType === "SENTENCE" &&
                      localeBlockIndex !== index && (
                        <BlockLocales blockId={block._id} />
                      )}
                    {localeBlockIndex === index ? (
                      <BlockLocaleForm
                        blockId={block._id}
                        setUpdateBlockIndex={setLocaleBlockIndex}
                        contentString={block.contentString}
                      />
                    ) : (
                      <UtilityButtons>
                        {block.content ? (
                          <IconButton
                            onClick={() => {
                              setUpdateBlockIndex(index);
                            }}
                            sx={{
                              width: 20,
                              height: 20,
                              padding: 0,
                            }}
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => {
                              createSentenceSectionsMutation.mutate({
                                blockId: block._id,
                                sentence: block.contentString,
                                langOrigin,
                              });
                            }}
                            sx={{
                              width: 20,
                              height: 20,
                              padding: 0,
                            }}
                          >
                            <GrainOutlinedIcon />
                          </IconButton>
                        )}
                        {block.contentType === "SENTENCE" && (
                          <IconButton
                            onClick={() => setLocaleBlockIndex(index)}
                            sx={{
                              width: 20,
                              height: 20,
                              padding: 0,
                            }}
                          >
                            <GTranslateOutlinedIcon />
                          </IconButton>
                        )}
                        <IconButton
                          onClick={() => {
                            updateBlockMutation.mutate({
                              id: block._id,
                              block: {
                                ...block,
                                isPublished: !block.isPublished,
                              },
                            });
                          }}
                          sx={{
                            width: 20,
                            height: 20,
                            padding: 0,
                          }}
                        >
                          <NewReleasesOutlinedIcon
                            color={block.isPublished ? "primary" : "action"}
                          />
                        </IconButton>
                      </UtilityButtons>
                    )}
                  </BlockContent>
                  <RightColumn>
                    <IconButton
                      onClick={() => {
                        const newSeq =
                          (blocks[index - 2]?.seq ?? 0) +
                          (blocks[index - 1].seq -
                            (blocks[index - 2]?.seq || 0)) /
                            2;

                        updateBlockMutation.mutate({
                          id: block._id,
                          block: { ...block, seq: newSeq },
                        });
                      }}
                      disabled={index === 0}
                      sx={{
                        width: 20,
                        height: 20,
                        padding: 0,
                      }}
                    >
                      <ExpandLessOutlinedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        const newSeq =
                          blocks[index + 1].seq +
                          ((blocks[index + 2]?.seq ||
                            blocks[blocks.length - 1].seq + 1) -
                            blocks[index + 1].seq) /
                            2;
                        updateBlockMutation.mutate({
                          id: block._id,
                          block: { ...block, seq: newSeq },
                        });
                      }}
                      disabled={index >= blocks.length - 1}
                      sx={{
                        width: 20,
                        height: 20,
                        padding: 0,
                      }}
                    >
                      <ExpandMoreOutlinedIcon />
                    </IconButton>
                  </RightColumn>
                </BlockWrapper>
              )}

              <NewBlockButton
                seq={
                  (block.seq + (blocks[index + 1]?.seq || block.seq + 1)) / 2
                }
                chapterId={chapterId}
                bottomSeparator={index < blocks.length - 1}
              />
            </>
          ))}
        </div>
      ) : (
        <NewBlockButton
          seq={1}
          chapterId={chapterId}
          topSeparator={false}
          bottomSeparator={false}
        />
      )}
    </Container>
  );
}

export default Blocks;

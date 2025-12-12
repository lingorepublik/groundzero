import {
  BlockContent,
  BlockWrapper,
  Container,
  RightColumn,
  UtilityButtons,
} from "./Blocks.styles";
import { useParams } from "react-router";
import { useFetchBlocks, useUpdateBlock } from "react-query";
import Sentence from "../Sentence/Sentence.tsx";
import { NewBlockButton } from "../NewBlockButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton } from "@mui/material";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useState } from "react";
import { UpdateBlockForm } from "../UpdateBlockForm";

function Blocks() {
  const [updateBlockIndex, setUpdateBlockIndex] = useState<number | null>(null);
  const [localeBlockIndex, setLocaleBlockIndex] = useState<number | null>(null);
  const { chapterId } = useParams();
  const { data: blocks, isLoading } = useFetchBlocks(chapterId);
  const updateBlockMutation = useUpdateBlock();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blocks) {
    return null;
  }

  return (
    <Container>
      {blocks && blocks.length > 0 ? (
        <>
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
                    <div>{block.seq}</div>
                    {block.contentType === "SENTENCE" ? (
                      <Sentence block={block} />
                    ) : (
                      <div>ILLUSTRATION</div>
                    )}
                    {localeBlockIndex === index ? (
                      <div>locale form</div>
                    ) : (
                      <UtilityButtons>
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
        </>
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

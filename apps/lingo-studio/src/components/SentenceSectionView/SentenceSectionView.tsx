import React, { useState } from "react";

import { SentenceSectionForm } from "../SentenceSectionForm";
import { Sentence } from "shared";
import {
  ButtonWrapper,
  Container,
  SentencePreview,
  SentenceSectionWrapper,
  ViewArea,
  ViewAreaWrapper,
  WordPreview,
} from "./SentenceSectionView.styles.ts";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";

type Props = {
  sentence: Sentence;
  setSentence: React.Dispatch<React.SetStateAction<Sentence>>;
};

function SentenceSectionView({ sentence, setSentence }: Props) {
  const [updateSentenceSectionIndex, setUpdateSentenceSectionIndex] = useState<
    number | null
  >(null);
  const [newSentenceSectionIndex, setNewSentenceSectionIndex] = useState<
    number | null
  >(null);

  return (
    <div>
      <SentencePreview>
        {sentence.map((sentenceSection, index) => (
          <WordPreview
            marginLeft={!(index === 0 || sentenceSection.punctuationMark)}
          >
            {sentenceSection.word}
          </WordPreview>
        ))}
      </SentencePreview>
      <Container>
        {sentence.length === 0 && (
          <SentenceSectionForm
            setSentence={setSentence}
            setNewSentenceSectionIndex={setNewSentenceSectionIndex}
            index={0}
            isCloseButtonDisabled={true}
          />
        )}

        {sentence.map((sentenceSection, index) => (
          <>
            <SentenceSectionWrapper>
              {index === updateSentenceSectionIndex ? (
                <SentenceSectionForm
                  sentenceSection={sentenceSection}
                  setSentence={setSentence}
                  setUpdateSentenceSectionIndex={setUpdateSentenceSectionIndex}
                  index={index}
                />
              ) : (
                <>
                  {index === 0 &&
                    (newSentenceSectionIndex !== 0 ? (
                      <IconButton
                        onClick={() => {
                          setUpdateSentenceSectionIndex(null);
                          setNewSentenceSectionIndex(0);
                        }}
                        type="button"
                        sx={{
                          width: 20,
                          height: 20,
                          padding: 0,
                        }}
                      >
                        <AddBoxIcon color="primary" />
                      </IconButton>
                    ) : (
                      <SentenceSectionForm
                        setSentence={setSentence}
                        setNewSentenceSectionIndex={setNewSentenceSectionIndex}
                        index={0}
                      />
                    ))}
                  <ViewAreaWrapper>
                    <ViewArea>
                      <div>index: {index}</div>
                      <div>{sentenceSection.word}</div>
                      {sentenceSection.lemma && (
                        <div>lemma: {sentenceSection.lemma}</div>
                      )}
                      {sentenceSection.refIndex !== undefined && (
                        <div>refIndex: {sentenceSection.refIndex}</div>
                      )}
                      {sentenceSection.punctuationMark && (
                        <div>punctuationMark: true</div>
                      )}
                      <ButtonWrapper>
                        <IconButton
                          onClick={() => {
                            setNewSentenceSectionIndex(null);
                            setUpdateSentenceSectionIndex(index);
                          }}
                          type="button"
                          sx={{
                            width: 20,
                            height: 20,
                            padding: 0,
                          }}
                        >
                          <EditIcon />
                        </IconButton>

                        {index > 0 && (
                          <IconButton
                            onClick={() => {
                              setSentence((prevState) => {
                                const arr = [...prevState];
                                [arr[index], arr[index - 1]] = [
                                  arr[index - 1],
                                  arr[index],
                                ];
                                return arr;
                              });
                            }}
                            type="button"
                            sx={{
                              width: 20,
                              height: 20,
                              padding: 0,
                            }}
                          >
                            <KeyboardArrowUpIcon />
                          </IconButton>
                        )}

                        {index < sentence.length - 1 && (
                          <IconButton
                            onClick={() => {
                              setSentence((prevState) => {
                                const arr = [...prevState];
                                [arr[index], arr[index + 1]] = [
                                  arr[index + 1],
                                  arr[index],
                                ];
                                return arr;
                              });
                            }}
                            type="button"
                            sx={{
                              width: 20,
                              height: 20,
                              padding: 0,
                            }}
                          >
                            <KeyboardArrowDownIcon />
                          </IconButton>
                        )}
                        <IconButton
                          onClick={() => {
                            setSentence((prevState) =>
                              prevState.filter((_, i) => i !== index),
                            );
                          }}
                          type="button"
                          sx={{
                            width: 20,
                            height: 20,
                            padding: 0,
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ButtonWrapper>
                    </ViewArea>
                    {newSentenceSectionIndex !== index + 1 ? (
                      <IconButton
                        onClick={() => {
                          setUpdateSentenceSectionIndex(null);
                          setNewSentenceSectionIndex(index + 1);
                        }}
                        type="button"
                        sx={{
                          width: 20,
                          height: 20,
                          padding: 0,
                          // marginBottom: 1,
                        }}
                      >
                        <AddBoxIcon color="primary" />
                      </IconButton>
                    ) : (
                      <SentenceSectionForm
                        setSentence={setSentence}
                        setNewSentenceSectionIndex={setNewSentenceSectionIndex}
                        index={index + 1}
                      />
                    )}
                  </ViewAreaWrapper>
                </>
              )}
            </SentenceSectionWrapper>
          </>
        ))}
      </Container>
    </div>
  );
}

export default SentenceSectionView;

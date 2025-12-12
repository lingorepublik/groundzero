import {
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { Container } from "./SentenceForm.styles.ts";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import { Sentence, SentenceSection } from "shared";

type Props = {
  setSentence: React.Dispatch<React.SetStateAction<Sentence>>;
  index: number;
  setSentenceSectionEditIndex?: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  setNewSentenceSectionIndex?: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  sentenceSection?: SentenceSection;
};

function SentenceForm({
  sentenceSection,
  setSentence,
  setSentenceSectionEditIndex,
  setNewSentenceSectionIndex,
  index,
}: Props) {
  const [word, setWord] = useState(sentenceSection?.word || "");
  const [lemma, setLemma] = useState(sentenceSection?.lemma || "");
  const [refIndex, setRefIndex] = useState<number | null>(
    sentenceSection?.refIndex || null,
  );
  const [isPunctuationMark, setIsPunctuationMark] = useState<boolean>(
    !!sentenceSection?.punctuationMark,
  );

  const handleAppend = () => {
    if (!word) {
      return;
    }

    const newSentenceSection: SentenceSection = { word };

    if (lemma) {
      newSentenceSection.lemma = lemma;
    }

    if (refIndex && refIndex >= 0) {
      newSentenceSection.refIndex = refIndex;
    }

    if (isPunctuationMark) {
      newSentenceSection.punctuationMark = true;
    }

    if (setSentenceSectionEditIndex) {
      setSentence((prevState) => {
        const arr = [...prevState];
        arr[index] = newSentenceSection;
        return arr;
      });

      setSentenceSectionEditIndex(null);
    }

    if (setNewSentenceSectionIndex) {
      setSentence((prevState) => {
        const arr = [...prevState];
        arr.splice(index, 0, newSentenceSection);
        return arr;
      });

      setNewSentenceSectionIndex(null);
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="Word"
          size="small"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <TextField
          label="Lemma"
          size="small"
          value={lemma}
          onChange={(e) => setLemma(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Ref Index"
          size="small"
          type="number"
          value={refIndex}
          onChange={(e) => {
            setRefIndex(+e.target.value);
          }}
          sx={{ width: 100 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPunctuationMark}
              onChange={(e) => {
                setIsPunctuationMark(e.target.checked);
              }}
            />
          }
          label="Punctuation Mark"
        />
        <IconButton
          onClick={handleAppend}
          sx={{
            width: 20,
            height: 20,
            padding: 0,
          }}
        >
          <SaveIcon color="primary" />
        </IconButton>
      </Box>
    </Container>
  );
}

export default SentenceForm;

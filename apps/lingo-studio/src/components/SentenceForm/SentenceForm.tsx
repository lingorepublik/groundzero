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
  sentence: Sentence;
  setSentence: React.Dispatch<React.SetStateAction<Sentence>>;
};

function SentenceForm({ sentence, setSentence }: Props) {
  const [word, setWord] = useState("");
  const [lemma, setLemma] = useState("");
  const [refIndex, setRefIndex] = useState<number | null>(null);
  const [isPunctuationMark, setIsPunctuationMark] = useState<boolean>(false);

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

    setSentence((prevState) => prevState.concat(newSentenceSection));
  };

  return (
    <Container>
      {sentence.map((sentenceSection) => (
        <div>{JSON.stringify(sentenceSection)}</div>
      ))}

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

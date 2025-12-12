import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  AVATAR_EXPRESSIONS,
  BALLOON_DIRECTIONS,
  BALLOON_TYPES,
  Block,
  CONTENT_TYPES,
  ContentType,
  Sentence,
} from "shared";
import { SentenceForm } from "../SentenceForm";

type Props = {
  chapterId: string;
  seq: number;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function NewBlockForm({ chapterId, seq, setShowForm }: Props) {
  const [sentence, setSentence] = useState<Sentence>([]);
  const [sentenceSectionEditIndex, setSentenceSectionEditIndex] = useState<
    number | null
  >(null);
  const [newSentenceSectionIndex, setNewSentenceSectionIndex] = useState<
    number | null
  >(null);
  const [showSentenceForm, setShowSentenceForm] = useState(false);
  const [showIllustrationForm, setShowIllustrationForm] = useState(false);

  const { register, handleSubmit, control } = useForm<Block>();

  const onSubmit: SubmitHandler<Block> = (data) => {
    if (data.contentType === "SENTENCE") {
      data.content = sentence;
    }

    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        margin: "5px 0",
        borderTop: "solid 1px #b0b0b0",
        borderBottom: "solid 1px #b0b0b0",
        padding: "15px",
      }}
    >
      <input type="hidden" value={chapterId} {...register("chapterId")} />
      <input type="hidden" value={seq} {...register("seq")} />

      <FormControl>
        <FormLabel>Content type</FormLabel>
        <Controller
          name="contentType"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              {...field}
              exclusive
              onChange={(_, value: ContentType) => {
                field.onChange(value);
                if (value === "SENTENCE") {
                  setShowSentenceForm(true);
                  setShowIllustrationForm(false);
                }
                if (value === "ILLUSTRATION") {
                  setShowIllustrationForm(true);
                  setShowSentenceForm(false);
                }
              }}
              size="small"
            >
              {CONTENT_TYPES.map((contentType) => (
                <ToggleButton value={contentType}>{contentType}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        />
      </FormControl>

      {showIllustrationForm && (
        <TextField
          label="Illustration URL"
          {...register("content")}
          size="small"
        />
      )}
      {showSentenceForm && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {sentence.length === 0 && (
            <SentenceForm
              setSentence={setSentence}
              setNewSentenceSectionIndex={setNewSentenceSectionIndex}
              index={0}
            />
          )}
          {sentence.map((sentenceSection, index) => (
            <>
              {index === sentenceSectionEditIndex ? (
                <SentenceForm
                  sentenceSection={sentenceSection}
                  setSentence={setSentence}
                  setSentenceSectionEditIndex={setSentenceSectionEditIndex}
                  index={index}
                />
              ) : (
                <>
                  {index === 0 &&
                    (newSentenceSectionIndex !== 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSentenceSectionEditIndex(null);
                          setNewSentenceSectionIndex(0);
                        }}
                      >
                        add new
                      </button>
                    ) : (
                      <SentenceForm
                        setSentence={setSentence}
                        setNewSentenceSectionIndex={setNewSentenceSectionIndex}
                        index={0}
                      />
                    ))}
                  <div style={{ backgroundColor: "aqua" }}>
                    <div>index: {index}</div>
                    <div>{sentenceSection.word}</div>
                    {sentenceSection.lemma && (
                      <div>lemma: {sentenceSection.lemma}</div>
                    )}
                    {sentenceSection.refIndex && (
                      <div>refIndex: {sentenceSection.refIndex}</div>
                    )}
                    {sentenceSection.punctuationMark && (
                      <div>punctuationMark: true</div>
                    )}
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => {
                          setNewSentenceSectionIndex(null);
                          setSentenceSectionEditIndex(index);
                        }}
                        type="button"
                      >
                        edit
                      </button>

                      {index > 0 && (
                        <button
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
                        >
                          up
                        </button>
                      )}

                      {index < sentence.length - 1 && (
                        <button
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
                        >
                          down
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSentence((prevState) =>
                            prevState.filter((_, i) => i !== index),
                          );
                        }}
                        type="button"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                  {newSentenceSectionIndex !== index + 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSentenceSectionEditIndex(null);
                        setNewSentenceSectionIndex(index + 1);
                      }}
                    >
                      add new
                    </button>
                  ) : (
                    <SentenceForm
                      setSentence={setSentence}
                      setNewSentenceSectionIndex={setNewSentenceSectionIndex}
                      index={index + 1}
                    />
                  )}
                </>
              )}
            </>
          ))}

          <TextField label="Audio" {...register("audio")} size="small" />
          <TextField
            label="Character"
            {...register("character")}
            size="small"
          />
          <TextField
            label="avatarUrl"
            {...register("avatarUrl")}
            size="small"
          />
          <FormControl>
            <FormLabel>Avatar Expression</FormLabel>
            <Controller
              name="avatarExpression"
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  {...field}
                  exclusive
                  onChange={(_, value) => field.onChange(value)}
                  size="small"
                >
                  {AVATAR_EXPRESSIONS.map((avatarExpression) => (
                    <ToggleButton value={avatarExpression}>
                      {avatarExpression}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ballon Direction</FormLabel>
            <Controller
              name="balloonDirection"
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  {...field}
                  exclusive
                  onChange={(_, value) => field.onChange(value)}
                  size="small"
                >
                  {BALLOON_DIRECTIONS.map((balloonDirection) => (
                    <ToggleButton value={balloonDirection}>
                      {balloonDirection}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ballon Type</FormLabel>
            <Controller
              name="balloonType"
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  {...field}
                  exclusive
                  onChange={(_, value) => field.onChange(value)}
                  size="small"
                >
                  {BALLOON_TYPES.map((balloonType) => (
                    <ToggleButton value={balloonType}>
                      {balloonType}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}
            />
          </FormControl>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained" size="small">
          Create
        </Button>
        <Button size="small" type="reset">
          Reset
        </Button>
        <Button color="error" size="small" onClick={() => setShowForm(false)}>
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default NewBlockForm;

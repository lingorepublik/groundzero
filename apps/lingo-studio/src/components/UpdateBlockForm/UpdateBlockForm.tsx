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
import { Dispatch, SetStateAction, useState } from "react";
import {
  AVATAR_EXPRESSIONS,
  BALLOON_DIRECTIONS,
  BALLOON_TYPES,
  Block,
  CONTENT_TYPES,
  ContentType,
  SavedBlock,
  Sentence,
} from "shared";
import { useUpdateBlock } from "react-query";
import { SentenceSectionView } from "../SentenceSectionView";

type Props = {
  block: SavedBlock;
  setUpdateBlockIndex: Dispatch<SetStateAction<number | null>>;
};

function UpdateBlockForm({ block, setUpdateBlockIndex }: Props) {
  const { contentType, content, chapterId } = block;

  const sentenceInitValue =
    contentType === "SENTENCE" ? (content as Sentence) : [];

  const [sentence, setSentence] = useState<Sentence>(sentenceInitValue);
  const [showSentenceForm, setShowSentenceForm] = useState(
    contentType === "SENTENCE",
  );
  const [showIllustrationForm, setShowIllustrationForm] = useState(
    contentType === "ILLUSTRATION",
  );

  const updateBlockMutation = useUpdateBlock(chapterId.toString());

  const { register, handleSubmit, control } = useForm<Block>({
    defaultValues: block,
  });

  const onSubmit: SubmitHandler<Block> = (data) => {
    if (data.contentType === "SENTENCE") {
      data.content = sentence;
    }

    const cleanedData: SavedBlock = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined && v !== ""),
    ) as SavedBlock;

    // if (
    //   !cleanedData.content ||
    //   (Array.isArray(cleanedData.content) && cleanedData.content.length === 0)
    // ) {
    //   return;
    // }

    updateBlockMutation?.mutate({ id: cleanedData._id, block: cleanedData });

    setUpdateBlockIndex(null);
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
      <input type="hidden" {...register("chapterId")} />
      <input type="hidden" {...register("seq")} />

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
          {sentence && sentence.length > 0 && (
            <SentenceSectionView
              sentence={sentence}
              setSentence={setSentence}
            />
          )}

          <TextField
            label="Content string"
            {...register("contentString")}
            size="small"
            multiline
            rows={4}
          />
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
          Update
        </Button>
        <Button
          color="error"
          size="small"
          onClick={() => setUpdateBlockIndex(null)}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default UpdateBlockForm;

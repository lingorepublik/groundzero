import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useFetchLang } from "react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LEVELS, StoryAiRequestBody } from "shared";
import React from "react";
import { useCreateStoryAi } from "react-query/src/api-hooks/useCreateStoryAi";

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  seq: number;
};

function NewStoryFormAi({ seq, setShowForm }: Props) {
  const createStoryAiMutation = useCreateStoryAi();
  const { data } = useFetchLang();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StoryAiRequestBody>();

  const onSubmit: SubmitHandler<StoryAiRequestBody> = (data) => {
    /**
     * TODO: try to wait till the mutation happens. during that time, keep the form disabled
     * */
    createStoryAiMutation.mutate(data);
    setShowForm(false);
  };

  if (!data) {
    return;
  }

  const lang = data.lang;

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
      <input type="hidden" {...register("lang")} value={lang} />

      <input type="hidden" {...register("seq")} value={seq} />

      <FormControl>
        <FormLabel>Level</FormLabel>
        <Controller
          name="level"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              {...field}
              exclusive
              onChange={(_, value) => field.onChange(value)}
              size="small"
            >
              {LEVELS[lang].map((level) => (
                <ToggleButton value={level}>{level}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        />
      </FormControl>

      <TextField
        label="Focus"
        {...register("focus", { required: "Focus is required" })}
        error={!!errors.focus}
        helperText={errors.focus?.message as string}
        size="small"
        multiline
        rows={4}
      />

      <TextField
        label="Setting"
        {...register("setting", { required: "Setting is required" })}
        error={!!errors.setting}
        helperText={errors.setting?.message as string}
        size="small"
        multiline
        rows={4}
      />

      <TextField
        label="Characters"
        {...register("characters", { required: "Characters is required" })}
        error={!!errors.characters}
        helperText={errors.characters?.message as string}
        size="small"
      />

      <TextField label="Note" {...register("note")} size="small" />

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

export default NewStoryFormAi;

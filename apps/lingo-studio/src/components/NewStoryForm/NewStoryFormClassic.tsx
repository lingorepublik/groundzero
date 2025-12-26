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
import { LEVELS, type Story, TIERS } from "shared";
import { useCreateStory, useFetchLang } from "react-query";
import React from "react";

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  seq: number;
};

function NewStoryFormClassic({ seq, setShowForm }: Props) {
  const createStoryMutation = useCreateStory();
  const { data } = useFetchLang();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Story>();

  const onSubmit: SubmitHandler<Story> = (data) => {
    createStoryMutation.mutate(data);
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

      <TextField
        label="Title"
        {...register("title", { required: "Title is required" })}
        error={!!errors.title}
        helperText={errors.title?.message as string}
        size="small"
      />

      <TextField label="Note" {...register("note")} size="small" />

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

      <FormControl>
        <FormLabel>Tier</FormLabel>
        <Controller
          name="tier"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              {...field}
              exclusive
              onChange={(_, value) => field.onChange(value)}
              size="small"
            >
              {TIERS.map((tier) => (
                <ToggleButton value={tier}>{tier}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        />
      </FormControl>

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

export default NewStoryFormClassic;

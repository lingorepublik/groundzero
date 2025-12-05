import { Controller, useForm } from "react-hook-form";
import { useCreateStory } from "react-query";
import {
  TextField,
  Button,
  Box,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
  FormLabel,
} from "@mui/material";

type Props = {
  seq: number;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function NewStoryForm({ seq, setShowForm }: Props) {
  const createStoryMutation = useCreateStory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    // defaultValues: { level: "A1" },
  });

  const onSubmit = (data) => {
    createStoryMutation.mutate(data);
    setShowForm(false);
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
      <input type="hidden" {...register("lang")} value="de-DE" />
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
              <ToggleButton value="A1">A1</ToggleButton>
              <ToggleButton value="A2">A2</ToggleButton>
              <ToggleButton value="B1">B1</ToggleButton>
              <ToggleButton value="B2">B2</ToggleButton>
              <ToggleButton value="C1">C1</ToggleButton>
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
              <ToggleButton value="free">free</ToggleButton>
              <ToggleButton value="starred">starred</ToggleButton>
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

export default NewStoryForm;

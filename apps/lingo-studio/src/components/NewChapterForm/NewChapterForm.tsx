import {
  Box,
  FormControl,
  TextField,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateChapter } from "react-query";
import { Chapter, TIERS } from "shared";

type Props = {
  storyId: string;
  seq: number;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function NewChapterForm({ storyId, seq, setShowForm }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Chapter>();

  const createChapterMutation = useCreateChapter(storyId);

  const onSubmit: SubmitHandler<Chapter> = (data) => {
    createChapterMutation?.mutate(data);
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
      <input type="hidden" {...register("storyId")} value={storyId} />
      <input type="hidden" {...register("seq")} value={seq} />

      <TextField
        label="Title"
        {...register("title", { required: "Title is required" })}
        error={!!errors.title}
        helperText={errors.title?.message as string}
        size="small"
      />

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

export default NewChapterForm;

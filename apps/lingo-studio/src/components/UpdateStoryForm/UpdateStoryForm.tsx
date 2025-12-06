import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useFetchLang, useUpdateStory } from "react-query";
import {
  TextField,
  Button,
  Box,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
  FormLabel,
} from "@mui/material";
import { LEVELS, SavedStory, TIERS } from "shared";

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  story: SavedStory;
};

function UpdateStoryForm({ story, setShowForm }: Props) {
  const updateStoryMutation = useUpdateStory();
  const { data } = useFetchLang();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SavedStory>({
    defaultValues: {
      tier: story.tier,
      level: story.level,
      title: story.title,
      note: story.note,
    },
  });

  const onSubmit: SubmitHandler<SavedStory> = (data) => {
    updateStoryMutation.mutate({
      id: data._id,
      story: { ...data },
    });

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
      <input type="hidden" {...register("_id")} value={story._id} />
      <input type="hidden" {...register("lang")} value={story.lang} />
      <input type="hidden" {...register("seq")} value={story.seq} />

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
                <ToggleButton key={tier} value={tier}>
                  {tier}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        />
      </FormControl>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained" size="small">
          Update
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

export default UpdateStoryForm;

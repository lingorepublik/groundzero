import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  useFetchLang,
  useFetchStoryLocales,
  useUpdateStoryLocales,
} from "react-query";
import { Language, LANGUAGES, StoryLocale } from "shared";

type Props = {
  storyId: string;
  setShowLocalesForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function StoryLocaleForm({ storyId, setShowLocalesForm }: Props) {
  const { data } = useFetchStoryLocales(storyId);
  const { data: langData } = useFetchLang();
  const updateStoryLocalesMutation = useUpdateStoryLocales(storyId);

  const localesLangs =
    langData && LANGUAGES.filter((language) => language !== langData.lang);

  const defaultValues: Record<Language, string> = {} as Record<
    Language,
    string
  >;

  if (data) {
    data.forEach((locale) => {
      defaultValues[locale.lang] = locale.titleTranslation;
    });
  }

  const { handleSubmit, register } = useForm({ defaultValues: defaultValues });

  const onSubmit = (data: Record<Language, string>) => {
    const locales: StoryLocale[] = [];

    Object.entries(data).map((key) => {
      locales.push({
        storyId: storyId,
        lang: key[0] as Language,
        titleTranslation: key[1],
      });
    });

    updateStoryLocalesMutation.mutate(locales);
    setShowLocalesForm(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 1 }}
    >
      <span>Story Locales</span>
      {localesLangs?.map((lang) => (
        <TextField label={lang} {...register(lang)} size="small" />
      ))}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained" size="small">
          Update
        </Button>
        <Button
          color="error"
          size="small"
          onClick={() => setShowLocalesForm(false)}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default StoryLocaleForm;

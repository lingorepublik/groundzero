import { Box, Button, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  useFetchLang,
  useFetchStoryLocales,
  useStories,
  useTranslateAi,
  useUpdateStoryLocales,
} from "react-query";
import { Language, LANGUAGES, StoryLocale } from "shared";
import React from "react";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

type Props = {
  storyId: string;
  setShowLocalesForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function StoryLocaleForm({ storyId, setShowLocalesForm }: Props) {
  const { data: stories } = useStories();
  const { data } = useFetchStoryLocales(storyId);
  const { data: langData } = useFetchLang();
  const updateStoryLocalesMutation = useUpdateStoryLocales(storyId);
  const translateMutation = useTranslateAi();

  const story = stories?.find((story) => story._id === storyId);

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

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: defaultValues,
  });

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
      {localesLangs?.map((lang) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label={lang}
            {...register(lang)}
            size="small"
            sx={{ backgroundColor: "white", flex: 1 }}
          />
          <IconButton
            onClick={() => {
              translateMutation.mutate(
                {
                  text: story?.title,
                  langOrigin: langData?.lang,
                  langTarget: lang,
                },
                {
                  onSuccess: (data) => {
                    setValue(lang, data.translation);
                  },
                },
              );
            }}
            sx={{
              width: 20,
              height: 20,
              padding: 0,
            }}
          >
            <AutoAwesomeOutlinedIcon color="primary" />
          </IconButton>
        </Box>
      ))}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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

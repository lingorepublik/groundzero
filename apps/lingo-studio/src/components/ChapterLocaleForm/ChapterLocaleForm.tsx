import { Box, Button, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  useFetchLang,
  useFetchChapterLocales,
  useUpdateChapterLocales,
  useTranslateAi,
} from "react-query";
import { ChapterLocale, Language, LANGUAGES } from "shared";
import React from "react";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

type Props = {
  chapterId: string;
  setShowLocalesForm: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

function ChapterLocaleForm({ chapterId, setShowLocalesForm, title }: Props) {
  const { data } = useFetchChapterLocales(chapterId);
  const { data: langData } = useFetchLang();
  const translateMutation = useTranslateAi();

  const updateChapterLocalesMutation = useUpdateChapterLocales(chapterId);

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
    const locales: ChapterLocale[] = [];

    Object.entries(data).map((key) => {
      locales.push({
        chapterId: chapterId,
        lang: key[0] as Language,
        titleTranslation: key[1],
      });
    });

    updateChapterLocalesMutation.mutate(locales);
    setShowLocalesForm(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
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
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <IconButton
            onClick={() => {
              translateMutation.mutate(
                {
                  text: title,
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

export default ChapterLocaleForm;

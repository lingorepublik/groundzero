import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  useFetchLang,
  useFetchChapterLocales,
  useUpdateChapterLocales,
} from "react-query";
import { ChapterLocale, Language, LANGUAGES } from "shared";

type Props = {
  chapterId: string;
  setShowLocalesForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChapterLocaleForm({ chapterId, setShowLocalesForm }: Props) {
  const { data } = useFetchChapterLocales(chapterId);
  const { data: langData } = useFetchLang();
  console.log(langData);

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

  const { handleSubmit, register } = useForm({ defaultValues: defaultValues });

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
        <TextField
          label={lang}
          {...register(lang)}
          size="small"
          sx={{ backgroundColor: "white" }}
        />
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

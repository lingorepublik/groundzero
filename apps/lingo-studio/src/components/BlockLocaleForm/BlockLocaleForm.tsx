import React, { useEffect } from "react";
import { useFetchBlockLocales, useFetchLang } from "react-query";
import { BlockLocale, Language, LANGUAGES } from "shared";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUpdateBlockLocales } from "react-query/src/api-hooks/useUpdateBlockLocales/useUpdateBlockLocales.ts";

type RefinedLocales = {
  translation: string;
  insight: string;
};

type FormValues = {
  [key in Language]?: {
    translation: string;
    insight: string;
  };
};

type Props = {
  blockId: string;
  setUpdateBlockIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

function BlockLocaleForm({ blockId, setUpdateBlockIndex }: Props) {
  const { data: langData } = useFetchLang();
  const { data } = useFetchBlockLocales(blockId);
  const updateBlockLocalesMutation = useUpdateBlockLocales(blockId);

  const localesLangs =
    langData && LANGUAGES.filter((language) => language !== langData.lang);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {},
    shouldUnregister: true,
  });

  useEffect(() => {
    if (langData && data) {
      const defaultValues: Partial<Record<Language, RefinedLocales>> = {};

      localesLangs?.forEach((lang) => {
        const locale = data?.filter((l) => l.lang === lang)[0];

        defaultValues[locale?.lang] = {
          translation: locale?.sentenceTranslation || "",
          insight: locale?.insight || "",
        };
      });

      reset(defaultValues);
    }
  }, [langData, data]);

  const onSubmit = (data: Record<string, RefinedLocales>) => {
    console.log(data);

    const formattedData = Object.entries(data)
      .map(([key, value]) => {
        if (value.translation || value.insight) {
          return {
            blockId: blockId,
            lang: key as Language,
            sentenceTranslation: value.translation,
            insight: value.insight,
          };
        }
      })
      .filter((l) => l !== undefined);

    console.log(formattedData);

    updateBlockLocalesMutation.mutate(formattedData);
    setUpdateBlockIndex(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
    >
      {localesLangs?.map((lang) => (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <TextField
            label={`${lang} Translation`}
            {...register(`${lang}.translation`)}
            size="small"
            fullWidth
          />
          <TextField
            label={`${lang} Insight`}
            {...register(`${lang}.insight`)}
            size="small"
            multiline
            minRows={3}
            fullWidth
          />
        </Box>
      ))}

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

export default BlockLocaleForm;

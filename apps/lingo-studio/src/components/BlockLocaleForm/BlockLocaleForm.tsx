import React from "react";
import { useFetchBlockLocales, useFetchLang } from "react-query";
import { Language, LANGUAGES } from "shared";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUpdateBlockLocales } from "react-query/src/api-hooks/useUpdateBlockLocales/useUpdateBlockLocales.ts";

type Props = {
  blockId: string;
  setUpdateBlockIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

function BlockLocaleForm({ blockId, setUpdateBlockIndex }: Props) {
  const { data } = useFetchBlockLocales(blockId);
  const { data: langData } = useFetchLang();
  const updateBlockLocalesMutation = useUpdateBlockLocales(blockId);

  const localesLangs =
    langData && LANGUAGES.filter((language) => language !== langData.lang);

  const defaultValues = {};

  if (data) {
    localesLangs?.forEach((lang) => {
      const locale = data?.filter((l) => l.lang === lang)[0];

      defaultValues[locale?.lang] = {
        translation: locale?.sentenceTranslation || "",
        insight: locale?.insight || "",
      };
    });
  }

  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: any) => {
    const formattedData = Object.entries(data).map(([key, value]) => ({
      blockId: blockId,
      lang: key as Language,
      sentenceTranslation: value.translation,
      insight: value.insight,
    }));

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

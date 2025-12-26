import React, { useEffect } from "react";
import {
  useFetchBlockLocales,
  useFetchLang,
  useInsightAi,
  useTranslateAi,
} from "react-query";
import { Language, LANGUAGES } from "shared";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUpdateBlockLocales } from "react-query/src/api-hooks/useUpdateBlockLocales/useUpdateBlockLocales.ts";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

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
  contentString: string;
};

function BlockLocaleForm({
  blockId,
  setUpdateBlockIndex,
  contentString,
}: Props) {
  const { data: langData } = useFetchLang();
  const { data } = useFetchBlockLocales(blockId);
  const updateBlockLocalesMutation = useUpdateBlockLocales(blockId);
  const translateAiMutation = useTranslateAi();
  const insightAiMutation = useInsightAi();

  const localesLangs =
    langData && LANGUAGES.filter((language) => language !== langData.lang);

  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
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
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              label={`${lang} Translation`}
              {...register(`${lang}.translation`)}
              size="small"
              fullWidth
            />
            <IconButton
              onClick={() => {
                translateAiMutation.mutate(
                  {
                    text: contentString,
                    langOrigin: langData?.lang,
                    langTarget: lang,
                  },
                  {
                    onSuccess: (data) => {
                      setValue(`${lang}.translation`, data.translation);
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
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              label={`${lang} Insight`}
              {...register(`${lang}.insight`)}
              size="small"
              multiline
              minRows={3}
              fullWidth
            />
            <IconButton
              onClick={() => {
                insightAiMutation.mutate(
                  {
                    text: contentString,
                    langOrigin: langData?.lang,
                    langTarget: lang,
                  },
                  {
                    onSuccess: (data) => {
                      setValue(`${lang}.insight`, data.insight);
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

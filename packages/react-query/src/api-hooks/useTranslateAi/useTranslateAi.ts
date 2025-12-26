import { useMutation } from "@tanstack/react-query";

const fetchTranslate = async (translationData: any) => {
  const response = await fetch(
    "http://localhost:3013/api/v1/translate-insight-ai/translate/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(translationData),
    },
  );
  const data = await response.json();
  return data;
};

export const useTranslateAi = () => {
  return useMutation({
    mutationFn: fetchTranslate,
  });
};

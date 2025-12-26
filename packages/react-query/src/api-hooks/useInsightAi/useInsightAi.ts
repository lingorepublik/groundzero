import { useMutation } from "@tanstack/react-query";

const fetchInsight = async (insightData: any) => {
  const response = await fetch(
    "http://localhost:3013/api/v1/translate-insight-ai/insight/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(insightData),
    },
  );
  const data = await response.json();
  return data;
};

export const useInsightAi = () => {
  return useMutation({
    mutationFn: fetchInsight,
  });
};

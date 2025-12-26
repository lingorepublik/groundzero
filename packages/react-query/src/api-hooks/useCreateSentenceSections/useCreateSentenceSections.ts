import { useMutation, useQueryClient } from "@tanstack/react-query";

const createSentenceSectionsAi = async (sentenceSectionParams: any) => {
  const response = await fetch(
    "http://localhost:3013/api/v1/sentence-section-ai/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sentenceSectionParams),
    },
  );

  // TODO: add sentry login here
  if (!response.ok) throw new Error("Failed to create ai sentence sections");

  return await response.json();
};

export const useCreateSentenceSections = (chapterId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSentenceSectionsAi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blocks", chapterId],
      });
    },
  });
};

// ### create sentence sectiions with ai
//   POST http://localhost:3013/api/v1/sentence-section-ai/
//   Content-Type: application/json
//
// {
//   "blockId":  "694f09666588ccfd4ea73d0b",
//   "langOrigin": "de-DE",
//   "sentence": "Ich freue mich, weil ich mir den Termin aufschreibe."
// }

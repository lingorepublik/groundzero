import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Chapter, SavedChapter } from "shared";

const createChapter = async (chapter: Chapter): Promise<SavedChapter> => {
  const response = await fetch("http://localhost:3013/chapter/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chapter),
  });

  // TODO: add sentry logging
  if (!response.ok) throw new Error("Failed to create the chapter");

  const data = await response.json();
  return data;
};

export const useCreateChapter = (storyId?: string) => {
  const queryClient = useQueryClient();

  if (!storyId) {
    return null;
  }

  return useMutation({
    mutationFn: createChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapters", storyId] });
    },
  });
};

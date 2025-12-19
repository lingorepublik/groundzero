import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Chapter, SavedChapter } from "shared";

const updateChapter = async ({
  id,
  chapter,
}: {
  id: string;
  chapter: Chapter;
}): Promise<SavedChapter> => {
  const response = await fetch(`http://localhost:3013/api/v1/chapter/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chapter),
  });

  // TODO: add sentry logging
  if (!response.ok) throw new Error("Failed to update the chapter");

  const data = await response.json();
  return data;
};

export const useUpdateChapter = (storyId?: string) => {
  const queryClient = useQueryClient();

  if (!storyId) {
    return null;
  }

  return useMutation({
    mutationFn: updateChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapters", storyId] });
    },
  });
};

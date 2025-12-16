import { ChapterLocale, SavedChapterLocale } from "shared";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const updateChapterLocales = async (
  chapterLocales: ChapterLocale[],
): Promise<SavedChapterLocale[]> => {
  const response = await fetch("http://localhost:3013/api/v1/chapter-locale", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chapterLocales),
  });

  // TODO: add sentry logging here
  if (!response.ok) throw new Error("failed to update the chapter locales");

  const data = await response.json();

  return data;
};

export const useUpdateChapterLocales = (chapterId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateChapterLocales,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chapter-locales", chapterId],
      });
    },
  });
};

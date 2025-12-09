import { SavedStoryLocale, StoryLocale } from "shared";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const updateStoryLocales = async (
  storyLocales: StoryLocale[],
): Promise<SavedStoryLocale[]> => {
  const response = await fetch("http://localhost:3013/story-locale", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(storyLocales),
  });

  // TODO: add sentry logging here
  if (!response.ok) throw new Error("failed to update the story locales");

  const data = await response.json();

  return data;
};

export const useUpdateStoryLocales = (storyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStoryLocales,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["story-locales", storyId] });
    },
  });
};

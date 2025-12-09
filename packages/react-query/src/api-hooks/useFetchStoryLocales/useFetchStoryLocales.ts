import { QueryFunction, useQuery } from "@tanstack/react-query";
import { SavedStoryLocale } from "shared";

const fetchStoryLocalesByStoryId: QueryFunction<SavedStoryLocale[]> = async ({
  queryKey,
}): Promise<SavedStoryLocale[]> => {
  const [, id] = queryKey;

  const response = await fetch(`http://localhost:3013/story-locale/${id}`);
  const data = await response.json();

  return data;
};

export const useFetchStoryLocales = (storyId: string) => {
  return useQuery<SavedStoryLocale[]>({
    queryKey: ["story-locales", storyId],
    queryFn: fetchStoryLocalesByStoryId,
    enabled: !!storyId,
  });
};

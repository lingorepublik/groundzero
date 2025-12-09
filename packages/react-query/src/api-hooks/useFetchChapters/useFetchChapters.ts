import { QueryFunction, useQuery } from "@tanstack/react-query";
import { SavedChapter } from "shared";

const fetchChaptersByStoryId: QueryFunction<SavedChapter[]> = async ({
  queryKey,
}): Promise<SavedChapter[]> => {
  const [, storyId] = queryKey;

  const response = await fetch(`http://localhost:3013/chapter/${storyId}`);
  const data = await response.json();

  return data;
};

export const useFetchChapters = (storyId?: string) => {
  return useQuery<SavedChapter[]>({
    queryKey: ["chapters", storyId],
    queryFn: fetchChaptersByStoryId,
    enabled: !!storyId,
  });
};

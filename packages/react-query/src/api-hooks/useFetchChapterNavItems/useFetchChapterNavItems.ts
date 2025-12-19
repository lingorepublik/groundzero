import { QueryFunction, useQuery } from "@tanstack/react-query";
import { ChapterNavItemUI } from "shared";

const fetchChapterNavItems: QueryFunction<ChapterNavItemUI[]> = async ({
  queryKey,
}): Promise<ChapterNavItemUI[]> => {
  const [_, storyId] = queryKey;

  const response = await fetch(
    `http://localhost:4013/api/v1/chapters/${storyId}`,
  );

  return await response.json();
};

export const useFetchChapterNavItems = (storyId?: string) => {
  return useQuery<ChapterNavItemUI[]>({
    queryKey: ["chapter-nav-items-fe-app", storyId],
    queryFn: fetchChapterNavItems,
    enabled: !!storyId,
  });
};

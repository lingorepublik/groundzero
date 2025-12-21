import { useQuerySecure } from "../../auth-api-hooks";

export const useFetchChapterNavItems = (storyId?: string) => {
  return useQuerySecure(
    ["chapter-nav-items-fe-app", storyId],
    `chapters/${storyId}`,
  );
};

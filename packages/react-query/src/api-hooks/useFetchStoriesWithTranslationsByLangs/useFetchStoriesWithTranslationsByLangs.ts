import { QueryFunction, useQuery } from "@tanstack/react-query";
import { StoryUI } from "shared";

export const fetchStoriesWithTranslationsByLangs: QueryFunction<
  StoryUI[]
> = async (): Promise<StoryUI[]> => {
  const response = await fetch(`http://localhost:4013/api/v1/stories/`);

  return await response.json();
};

export const useFetchStoriesWithTranslationsByLangs = () => {
  return useQuery<StoryUI[]>({
    queryKey: ["stories-fe-app"],
    queryFn: fetchStoriesWithTranslationsByLangs,
  });
};

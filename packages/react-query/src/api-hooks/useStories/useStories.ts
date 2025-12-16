import { useQuery } from "@tanstack/react-query";
import { SavedStory } from "shared";

const fetchStoriesByLang = async (): Promise<SavedStory[]> => {
  const response = await fetch("http://localhost:3013/api/v1/story/lang/de-DE");
  const data = await response.json();
  return data;
};

export const useStories = () => {
  return useQuery<Array<SavedStory>>({
    queryKey: ["stories"],
    queryFn: fetchStoriesByLang,
  });
};

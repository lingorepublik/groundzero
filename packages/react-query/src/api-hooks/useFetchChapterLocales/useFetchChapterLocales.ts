import { QueryFunction, useQuery } from "@tanstack/react-query";
import { SavedChapterLocale } from "shared";

const fetchChapterLocalesByChapterId: QueryFunction<
  SavedChapterLocale[]
> = async ({ queryKey }): Promise<SavedChapterLocale[]> => {
  const [, id] = queryKey;

  const response = await fetch(`http://localhost:3013/chapter-locale/${id}`);
  const data = await response.json();

  return data;
};

export const useFetchChapterLocales = (chapterId: string) => {
  return useQuery<SavedChapterLocale[]>({
    queryKey: ["chapter-locales", chapterId],
    queryFn: fetchChapterLocalesByChapterId,
    enabled: !!chapterId,
  });
};

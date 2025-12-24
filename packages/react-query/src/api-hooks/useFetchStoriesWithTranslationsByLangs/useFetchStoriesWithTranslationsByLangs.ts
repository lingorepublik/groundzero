import { useQuerySecure } from "../../auth-api-hooks";

export const useFetchStoriesWithTranslationsByLangs = () => {
  return useQuerySecure(["stories-fe-app"], "stories");
};

// import { QueryFunction, useQuery } from "@tanstack/react-query";
// import { ChapterWithBlocksAndLocales } from "shared";
import { useQuerySecure } from "../../auth-api-hooks";

// const fetchChapterAndBlocksWithLocales: QueryFunction<
//   ChapterWithBlocksAndLocales
// > = async ({ queryKey }): Promise<ChapterWithBlocksAndLocales> => {
//   const [, id] = queryKey;
//
//   const response = await fetch(`http://localhost:4013/api/v1/chapter/${id}`);
//   return await response.json();
// };

// export const useFetchChapterAndBlocksWithLocales = (chapterId?: string) => {
//   return useQuery<ChapterWithBlocksAndLocales>({
//     queryKey: ["chapter-with-blocks-fe-app", chapterId],
//     queryFn: fetchChapterAndBlocksWithLocales,
//     enabled: !!chapterId,
//   });
// };

export const useFetchChapterAndBlocksWithLocales = (chapterId?: string) => {
  return useQuerySecure(
    ["chapter-with-blocks-fe-app", chapterId],
    `chapter/${chapterId}`,
  );
};

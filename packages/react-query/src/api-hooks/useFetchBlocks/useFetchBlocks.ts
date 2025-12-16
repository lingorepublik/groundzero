import { QueryFunction, useQuery } from "@tanstack/react-query";
import { SavedBlock } from "shared";

const fetchBlocksByChapterId: QueryFunction<SavedBlock[]> = async ({
  queryKey,
}): Promise<SavedBlock[]> => {
  const [, chapterId] = queryKey;

  const response = await fetch(
    `http://localhost:3013/api/v1/block/${chapterId}`,
  );
  return await response.json();
};

export const useFetchBlocks = (chapterId?: string) => {
  return useQuery<SavedBlock[]>({
    queryKey: ["blocks", chapterId],
    queryFn: fetchBlocksByChapterId,
    enabled: !!chapterId,
  });
};

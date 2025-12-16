import { QueryFunction, useQuery } from "@tanstack/react-query";
import { SavedBlockLocale } from "shared";

const fetchBlockLocalesByBlockId: QueryFunction<SavedBlockLocale[]> = async ({
  queryKey,
}): Promise<SavedBlockLocale[]> => {
  const [, id] = queryKey;

  const response = await fetch(
    `http://localhost:3013/api/v1/block-locale/${id}`,
  );
  return await response.json();
};

export const useFetchBlockLocales = (blockId?: string) => {
  return useQuery<SavedBlockLocale[]>({
    queryKey: ["block-locale", blockId],
    queryFn: fetchBlockLocalesByBlockId,
    enabled: !!blockId,
  });
};

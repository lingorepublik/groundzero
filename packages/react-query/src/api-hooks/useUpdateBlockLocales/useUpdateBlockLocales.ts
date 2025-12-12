import { BlockLocale } from "shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateBlockLocales = async (blockLocales: BlockLocale[]) => {
  const response = await fetch("http://localhost:3013/block-locale", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blockLocales),
  });

  // TODO: add sentry logging here
  if (!response.ok) throw new Error("failed to update block locales");

  return await response.json();
};

export const useUpdateBlockLocales = (blockId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlockLocales,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["block-locale", blockId],
      });
    },
  });
};

import { Block, SavedBlock } from "shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createBlock = async (block: Block): Promise<SavedBlock> => {
  const response = await fetch("http://localhost:3013/api/v1/block/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(block),
  });

  // TODO: add sentry logging
  if (!response.ok) throw new Error("Failed to create the block");

  return await response.json();
};

export const useCreateBlock = (chapterId?: string) => {
  const queryClient = useQueryClient();

  if (!chapterId) {
    return null;
  }

  return useMutation({
    mutationFn: createBlock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks", chapterId] });
    },
  });
};

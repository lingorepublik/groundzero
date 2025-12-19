import { Block, SavedBlock } from "shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateBlock = async ({
  id,
  block,
}: {
  id: string;
  block: Block;
}): Promise<SavedBlock> => {
  const response = await fetch(`http://localhost:3013/api/v1/block/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(block),
  });

  // TODO: add sentry logging here
  if (!response.ok) throw new Error("Failed to update the block");

  return await response.json();
};

export const useUpdateBlock = (chapterId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks", chapterId] });
    },
  });
};

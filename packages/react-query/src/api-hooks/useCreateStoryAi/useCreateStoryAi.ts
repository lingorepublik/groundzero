import { SavedStory } from "shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createStoryAi = async (storyParams: any): Promise<SavedStory> => {
  const response = await fetch("http://localhost:3013/api/v1/story-ai/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(storyParams),
  });

  // TODO: add sentry login here
  if (!response.ok) throw new Error("Failed to create the ai story");

  return await response.json();
};

export const useCreateStoryAi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStoryAi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
    },
  });
};

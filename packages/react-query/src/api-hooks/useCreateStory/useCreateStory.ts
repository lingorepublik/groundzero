import { Story, SavedStory } from "shared";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const createStory = async (story: Story): Promise<SavedStory> => {
  const response = await fetch("http://localhost:3013/story/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(story),
  });

  // TODO: add sentry login here
  if (!response.ok) throw new Error("Failed to create the story");

  const data = await response.json();
  return data;
};

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
};

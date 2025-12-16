import { SavedStory, Story } from "shared";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const updateStory = async ({
  id,
  story,
}: {
  id: string;
  story: Story;
}): Promise<SavedStory> => {
  const response = await fetch(`http://localhost:3013/api/v1/story/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(story),
  });

  // TODO: add sentry logging here
  if (!response.ok) throw new Error("Failed to update the story");

  const data = await response.json();
  return data;
};

export const useUpdateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
};

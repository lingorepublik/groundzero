import { useMutation, useQueryClient } from "@tanstack/react-query";

const signOff = async () => {
  const response = await fetch("http://localhost:2013/api/v1/sign-off", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Sign off failed.");
  }

  return await response.json();
};

export const useSignOff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOff,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["token"] });
    },
  });
};

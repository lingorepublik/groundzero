import { useMutation, useQueryClient } from "@tanstack/react-query";

const anonymousUser = async () => {
  const response = await fetch(
    "http://localhost:2013/api/v1/sign-up-anonymous",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Anonymous user failed.");
  }

  return await response.json();
};

export const useAnonymousUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: anonymousUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["token"], data.token);
    },
  });
};

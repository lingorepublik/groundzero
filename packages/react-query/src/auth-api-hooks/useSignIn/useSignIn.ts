import { Credentials } from "shared/src/types/credentials.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const signIn = async (credentials: Credentials) => {
  const response = await fetch("http://localhost:2013/api/v1/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Sign in failed.");
  }

  return await response.json();
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["token"], data.token);
    },
  });
};

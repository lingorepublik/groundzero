import { Credentials } from "shared/src/types/credentials.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const signUp = async (credentials: Credentials) => {
  const response = await fetch("http://localhost:2013/api/v1/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Sign up failed.");
  }

  return await response.json();
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(["token"], data.token);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

const refreshToken = async () => {
  const response = await fetch(`http://localhost:2013/api/v1/refresh`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("FE-APP-REFRESH-TOKEN-GENERATION-FAILED");
  }

  return await response.json();
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      queryClient.setQueryData(["token"], data.token);
    },
  });
};

import { useToken } from "../useToken";
import { useQueryClient } from "@tanstack/react-query";

export const useProvideToken = () => {
  useToken();
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData<string>(["token"]);
  return { token };
};

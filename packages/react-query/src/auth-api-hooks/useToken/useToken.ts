import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRefreshToken } from "../useRefreshToken";
import { useAnonymousUser } from "../useAnonymousUser";

export const useToken = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();
  const refreshTokenMutation = useRefreshToken();
  const anonymousUserMutation = useAnonymousUser();

  const getToken = async (): Promise<string | undefined> => {
    const token = queryClient.getQueryData<string>(["token"]);

    if (token) {
      return;
    }

    try {
      await refreshTokenMutation.mutateAsync();
      return;
    } catch (e) {}

    try {
      await anonymousUserMutation.mutateAsync();
      return;
    } catch (e) {}

    return;
  };

  useEffect(() => {
    setIsLoading(true);
    getToken().then(() => {
      setToken(queryClient.getQueryData<string>(["token"]));
      setIsLoading(false);
    });
  }, []);

  return { token, isLoading };
};

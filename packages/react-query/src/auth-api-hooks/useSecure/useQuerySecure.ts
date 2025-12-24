import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRefreshToken } from "../useRefreshToken";
import { queryFnSecure } from "./queryFnSecure.ts";

type QueryKey = [string, string?];

export const useQuerySecure = <T>(queryKey: QueryKey, urlSlug: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useRefreshToken();
  const token = queryClient.getQueryData<string>(["token"]);

  const queryKeyRefined = queryKey.filter((k): k is string => k !== undefined);

  return useQuery<T>({
    queryKey: [...queryKeyRefined, token],
    queryFn: async (context) => {
      try {
        return await queryFnSecure(context);
      } catch (error: any) {
        if (error.message === "FE-APP-TOKEN-UNAUTHORIZED") {
          await mutateAsync();

          const newToken = queryClient.getQueryData<string>(["token"]);

          return queryFnSecure({
            ...context,
            queryKey: [...queryKeyRefined, newToken],
          });
        }

        /**
         * if the refresh token is also expired in the meantime,
         * execution will come here
         * */
        // window.location.reload();
        throw error;
      }
    },
    meta: {
      url: urlSlug,
    },
    enabled: !!token,
  });
};

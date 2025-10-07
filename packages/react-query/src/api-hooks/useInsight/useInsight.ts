import { useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["insight"];

export const useInsight = () => {
  const queryClient = useQueryClient();

  const { data: insight = [null, null] } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => null,
    staleTime: Infinity,
  });

  const setInsight = (insight: Array<string | null>) => {
    queryClient.setQueryData(QUERY_KEY, insight);
  };

  return { insight, setInsight };
};

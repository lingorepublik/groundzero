import { useQuery } from "@tanstack/react-query";

const fetchInsight = async (phrase: string | null) => {
  console.log("inside fetchInsight");
  if (!phrase) {
    return null;
  }
  return phrase;
};

export const useInsight = (phrase: string | null) => {
  return useQuery({
    queryKey: ["insight"],
    queryFn: () => fetchInsight(phrase),
    enabled: false,
    retry: false,
  });
};

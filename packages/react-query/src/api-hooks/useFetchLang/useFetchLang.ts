import { useQuery } from "@tanstack/react-query";
import { Language } from "shared";

export const useFetchLang = () => {
  return useQuery<{ lang: Language }>({
    queryKey: ["lang"],
    queryFn: () => ({ lang: "de-DE" }),
  });
};

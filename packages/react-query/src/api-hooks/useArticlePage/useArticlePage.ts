import { useQuery } from "@tanstack/react-query";

const fetchArticlePage = async () => {
  const response = await fetch("http://localhost:3013/article-page");
  const data = await response.json();
  return data;
};

export const useArticlePage = () => {
  return useQuery({
    queryKey: ["article"],
    queryFn: fetchArticlePage,
  });
};

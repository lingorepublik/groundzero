import { useQuery } from "@tanstack/react-query";

const catalog = [
  {
    link: "/article/nach-berlin/2",
    progressList: [0.2, 0.5, 1, 1, 0],
    trophyProgress: 0.7,
    starredTrophyProgress: 0,
    title: "nach Berlin",
    titleTranslation: "to Berlin",
    note: "perfect mit Sein",
  },
  {
    link: "/article/nach-berlin/2",
    progressList: [0.2, 0.5, 1, 1, 0],
    trophyProgress: 0.7,
    starredTrophyProgress: 0,
    title: "nach Berlin",
    titleTranslation: "to Berlin",
    note: "perfect mit Sein",
  },
];

const fetchCatalog = async () => {
  return catalog;
};

export const useCatalog = () => {
  return useQuery({
    queryKey: ["catalog"],
    queryFn: fetchCatalog,
  });
};

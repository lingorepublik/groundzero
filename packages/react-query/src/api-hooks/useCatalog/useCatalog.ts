import { useQuery } from "@tanstack/react-query";

const fetchCatalog = async () => {
  const response = await fetch("http://localhost:3013/catalog");
  const data = await response.json();
  return data;
};

export const useCatalog = () => {
  return useQuery({
    queryKey: ["catalog"],
    queryFn: fetchCatalog,
  });
};

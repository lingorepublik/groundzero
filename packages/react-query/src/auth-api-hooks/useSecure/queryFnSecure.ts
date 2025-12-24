import { QueryFunction } from "@tanstack/react-query";

const BASE_URL = "http://localhost:4013/";

type Meta = {
  url: string;
};

export const queryFnSecure = async <T>({
  queryKey,
  meta,
}: Parameters<QueryFunction<T>>[0]): Promise<T> => {
  const token = queryKey[queryKey.length - 1];
  const { url } = (meta || {}) as Meta;
  const response = await fetch(`${BASE_URL}api/v1/${url}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("FE-APP-TOKEN-UNAUTHORIZED");
  }

  return await response.json();
};

import { useQuery } from "@tanstack/react-query";
import { getUsers } from ".";
import { QUERY_KEYS } from "../query-keys";

export const useAllUsers = (page: number, limit: number = 10) => {
  const result = useQuery({
    queryFn: () => getUsers(page, limit),
    queryKey: [QUERY_KEYS.USER],
  });

  return { ...result, users: result.data };
};

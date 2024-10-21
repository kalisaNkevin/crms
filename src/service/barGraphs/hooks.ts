import { useQuery } from "@tanstack/react-query";
import { getBars } from ".";
import { QUERY_KEYS } from "../query-keys";

export const useFetchCustomerData = () => {
  const result = useQuery({
    queryFn: () => getBars(),
    queryKey: [QUERY_KEYS.TOTAL_USERS],
  });

  return { ...result, users: result.data };
};

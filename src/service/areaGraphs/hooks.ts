import { useQuery } from "@tanstack/react-query";
import { getVisitors } from ".";
import { QUERY_KEYS } from "../query-keys";

export const useFetchVisitorsData = () => {
  const result = useQuery({
    queryFn: () => getVisitors(),
    queryKey: [QUERY_KEYS.TOTAL_VISITORS],
  });

  return { ...result, users: result.data };
};

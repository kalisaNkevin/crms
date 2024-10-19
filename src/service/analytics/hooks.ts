import { useQueries, useQuery } from "@tanstack/react-query";
import { getTotalInvestors, getTotalSyndicates, getTotalTransactions } from ".";
import { QUERY_KEYS } from "../query-keys";

export const useGetInvestorCount = () => {
  const result = useQuery({
    queryKey: ["count"],
    queryFn: getTotalInvestors,
  });

  return { ...result, statisticsCount: result.data };
};

export const useGetAnalytics = () => {
  const result = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.TOTAL_TRANSACTIONS],
        queryFn: getTotalTransactions,
      },
      {
        queryKey: [QUERY_KEYS.TOTAL_SYNDICATE],
        queryFn: getTotalSyndicates,
      },
      {
        queryKey: [QUERY_KEYS.TOTAL_INVESTORS],
        queryFn: getTotalInvestors,
      },
    ],
  });

  const [transactionsQuery, syndicatesQuery, investorsQuery] = result;

  return {
    transactionsCount: transactionsQuery?.data,
    syndicatesCount: syndicatesQuery?.data,
    investorsCount: investorsQuery?.data,
  };
};

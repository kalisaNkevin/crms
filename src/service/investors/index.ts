import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { httpClient } from "@/config";
import { TInvestor, TInvestorSchema } from "../schema/investors";
import { QUERY_KEYS } from "../query-keys";

type SortOrder = "desc" | "asc";

type Params = {
  pageParam?: number;
  order: SortOrder;
};

const getInvestors = async ({
  pageParam = 1,
  order,
}: Params): Promise<TInvestor> => {
  const response = await httpClient.get(
    `/admin/users/investors?page=${pageParam}&limit=10&order=${order}`,
  );

  return response.data;
};
export const getInvestor = async (userId: string): Promise<TInvestorSchema> => {
  const response = await httpClient.get(`/investor/${userId}/profile`);

  return response.data?.data;
};

export const useGetInvestor = (userId: string) => {
  const result = useQuery({
    queryFn: () => getInvestor(userId),
    queryKey: [QUERY_KEYS.INVESTOR],
  });

  return {
    ...result,
    investor: result.data,
  };
};

export const useGetInvestors = ({ order }: { order: SortOrder }) => {
  const result = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => getInvestors({ pageParam, order }),
    initialPageParam: 1,
    queryKey: [QUERY_KEYS.INVESTORS, order],

    getNextPageParam: (lastPage, pages) => {
      const maxPages = lastPage.data.pagination.total / 8;
      const nextPage = pages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  return { ...result, investors: result.data };
};

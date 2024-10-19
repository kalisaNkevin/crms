import { QUERY_KEYS } from "@/service/query-keys";
import { SortOrder } from "@/types/base";
import {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getSyndicate,
  getSyndicateBalance,
  getSyndicateDeals,
  getSyndicates,
  updateSyndicateStatus,
} from "..";
import { useToast } from "@/components/ui/use-toast";
import { ApproveSyndicatePayload } from "@/service/syndicate-leaders";
import { AxiosResponse, isAxiosError } from "axios";

export const useGetSyndicates = ({ order }: { order: SortOrder }) => {
  const result = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => getSyndicates({ pageParam, order }),
    initialPageParam: 1,
    queryKey: [QUERY_KEYS.SYNDICATE, order],

    getNextPageParam: (lastPage, pages) => {
      const maxPages = lastPage.data.pagination.total / 10;
      const nextPage = pages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  return { ...result, syndicates: result.data };
};

export const useGetSyndicate = (id: string) => {
  const results = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.SYNDICATE, id],
        queryFn: () => getSyndicate(id),
      },
      {
        queryKey: [QUERY_KEYS.SYNDICATE_BALANCE, id],
        queryFn: () => getSyndicateBalance(id),
      },
    ],
  });

  const [syndicateQuery, balanceQuery] = results;

  return {
    ...syndicateQuery,
    syndicateDetails: syndicateQuery.data,
    balance: balanceQuery.data,
  };
};

export const useGetSyndicateDeals = (id: string) => {
  const result = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => getSyndicateDeals(id, pageParam),
    initialPageParam: 1,
    queryKey: [QUERY_KEYS.SYNDICATE_DEALS, id],

    getNextPageParam: (lastPage, pages) => {
      const maxPages = lastPage.data?.pagination?.total / 10;
      const nextPage = pages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  return { ...result, deals: result.data };
};

export const useUpdateSyndicateStatus = (type: "approve" | "reject") => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (args: Partial<ApproveSyndicatePayload>) =>
      updateSyndicateStatus(args, type),

    onSuccess: (res: AxiosResponse) => {
      queryClient.invalidateQueries();
      toast({
        variant: "success",
        title: "Syndicate",
        description: res.data.message?.clientMsg,
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message?.clientMsg ||
          error.response?.data?.message;

        toast({
          variant: "error",
          title: "Syndicate",
          description: message,
        });
      }
    },
  });
};

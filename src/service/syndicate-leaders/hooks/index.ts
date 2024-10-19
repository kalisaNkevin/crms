import { QUERY_KEYS } from "@/service/query-keys";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  updateSyndicateLeaderStatus,
  ApproveSyndicatePayload,
  deactivateSyndicateAccount,
  getSyndicateLeaderDetails,
  getSyndicateLeaders,
  getSyndicatesForSyndicateLeader,
} from "..";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { SortOrder } from "@/types/base";

// Queries
export const useGetSyndicateLeaders = ({ order }: { order: SortOrder }) => {
  const result = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => getSyndicateLeaders({ pageParam, order }),
    initialPageParam: 1,
    queryKey: [QUERY_KEYS.SYNDICATE_LEADERS, order],

    getNextPageParam: (lastPage, pages) => {
      const maxPages = lastPage.data.pagination.total / 10;
      const nextPage = pages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  return { ...result, syndicateLeaders: result.data };
};

export const useGetSyndicateLeader = ({ userId }: { userId: string }) => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.SYNDICATE_LEADERS],
    queryFn: () => getSyndicateLeaderDetails({ userId }),
  });

  return { ...result, syndicateLeader: result.data };
};

export const useGetSyndicatesForLeaders = (userId: string) => {
  const result = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) =>
      getSyndicatesForSyndicateLeader({ pageParam, userId }),
    initialPageParam: 1,
    queryKey: [QUERY_KEYS.SYNDICATES_FOR_LEADERS, userId],

    getNextPageParam: (lastPage, pages) => {
      const maxPages = lastPage.data.pagination.total / 10;
      const nextPage = pages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  return { ...result, syndicates: result.data };
};

// Mutations
export const useUpdateSyndicateLeaderStatus = (type: "approve" | "reject") => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (args: Partial<ApproveSyndicatePayload>) =>
      updateSyndicateLeaderStatus(args, type),

    onSuccess: (res) => {
      queryClient.invalidateQueries();
      toast({
        variant: "success",
        title: "Syndicate Leader",
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
          title: "Account",
          description: message,
        });
      }
    },
  });
};
export const useDeactivateAccount = (userId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deactivateSyndicateAccount(userId),
    onSuccess: (res) => {
      toast({
        variant: "success",
        title: "Account",
        description: res.message?.clientMsg,
      });
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      if (isAxiosError(error))
        toast({
          variant: "error",
          title: "Account",
          description: error.response?.data.message,
        });
    },
  });
};

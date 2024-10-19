import { httpClient } from "@/config";
import { SortOrder } from "@/types/base";
import {
  SyndicateBalance,
  SyndicateData,
  SyndicateDealsData,
  TSyndicate,
} from "@/types/syndicate";
import { ApproveSyndicatePayload } from "../syndicate-leaders";

type Params = {
  pageParam: number;
  order: SortOrder;
};

export const getSyndicates = async ({
  order,
  pageParam,
}: Params): Promise<SyndicateData> => {
  const response = await httpClient.get(
    `/syndicate?page=${pageParam}&limit=12&order=${order}`,
  );

  return response.data;
};

export const getSyndicate = async (id: string): Promise<TSyndicate> => {
  const response = await httpClient.get(`/syndicate/${id}`);

  return response.data?.data;
};

export const getSyndicateBalance = async (
  id: string,
): Promise<SyndicateBalance> => {
  const response = await httpClient.get(
    `/syndicate-leader/get-syndicate-info-on-chain/${id}`,
  );
  return response.data.data;
};

export const getSyndicateDeals = async (
  id: string,
  pageParam: number,
): Promise<SyndicateDealsData> => {
  const response = await httpClient.get(
    `/syndicate-deal/syndicate/${id}?page=${pageParam}&limit=10&order=desc`,
  );
  return response.data;
};

export const approveSyndicate = (id: string) => {
  return httpClient.patch(`/${id}/approve`);
};

export const updateSyndicateStatus = async (
  data: Partial<ApproveSyndicatePayload>,
  type: "approve" | "reject",
) => {
  const endpoint =
    type === "approve"
      ? `/syndicate/admin/${data.userId}/approve`
      : `/syndicate/admin/${data.userId}/reject`;

  return httpClient.patch(endpoint, data);
};

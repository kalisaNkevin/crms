import { httpClient } from "@/config";
import {
  TSyndicateLeader,
  TSyndicateLeaderData,
} from "../schema/syndicate-leaders";
import { SortOrder } from "@/types/base";
import { SyndicateData } from "@/types/syndicate";

type Params = {
  pageParam: number;
  order: SortOrder;
};

export type ApproveSyndicatePayload = { userId: string };

export const getSyndicateLeaders = async ({
  order,
  pageParam,
}: Params): Promise<TSyndicateLeaderData> => {
  const response = await httpClient.get(
    `/admin/users/syndicate-leaders?page=${pageParam}&limit=12&order=${order}`,
  );

  return response.data;
};

export const getSyndicateLeaderDetails = async ({
  userId,
}: {
  userId: string;
}): Promise<TSyndicateLeader> => {
  const response = await httpClient.get(`/syndicate-leader/${userId}/profile`);

  return response.data?.data;
};

export const deactivateSyndicateAccount = async (userId: string) => {
  const response = await httpClient.delete(
    `/syndicate-leader/${userId}/profile/deactivate`,
  );

  return response.data;
};
export const getSyndicatesForSyndicateLeader = async ({
  userId,
  pageParam,
}: {
  pageParam: number;
  userId: string;
}): Promise<SyndicateData> => {
  const response = await httpClient.get(
    `/syndicate/syndicate-leader/${userId}?page=${pageParam}&limit=10&order=desc`,
  );

  return response.data;
};

export const updateSyndicateLeaderStatus = async (
  data: Partial<ApproveSyndicatePayload>,
  type: "approve" | "reject",
) => {
  const endpoint =
    type === "approve"
      ? `/admin/users/${data.userId}/approve`
      : `/admin/users/${data.userId}/reject`;

  return httpClient.patch(endpoint, data);
};

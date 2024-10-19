import { httpClient } from "@/config";

export const getTotalInvestors = async () => {
  const response = await httpClient.get(
    "/admin/users/statistics/investors/count",
  );

  return response.data?.data;
};

export const getTotalTransactions = async () => {
  const response = await httpClient.get("/transaction/statistics/count");

  return response.data?.data;
};

export const getTotalSyndicates = async () => {
  const response = await httpClient.get("/syndicate/statistics/count");

  return response.data?.data;
};

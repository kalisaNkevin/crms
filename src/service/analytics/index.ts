import { httpClient } from "@/config";

export const getTotalPageViews = async () => {
  const response = await httpClient.get("/pageview");

  return response.data?.data;
};
export const getTotalUniqueVisitors = async () => {
  const response = await httpClient.get("/uniquevisitors");

  return response.data?.data;
};

export const getTotalBounceRate = async () => {
  const response = await httpClient.get("/bouncerate");

  return response.data?.data;
};

export const getTotalSessionDuration = async () => {
  const response = await httpClient.get("/sessionduration");

  return response.data?.data;
};

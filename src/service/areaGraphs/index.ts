import { httpClient } from "@/config";
export const getVisitors = async () => {
  const response = await httpClient.get(`/visitors`);
  return response.data;
};

import { httpClient } from "@/config";
export const getBars = async () => {
  const response = await httpClient.get(`/bargraph`);
  return response.data;
};

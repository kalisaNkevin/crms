import { httpClient } from "@/config";
export const getBars = async () => {
  try {
    const response = await httpClient.get(`/bargraph`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bars:", error);
    throw error;
  }
};

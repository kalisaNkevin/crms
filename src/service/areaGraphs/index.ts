import { httpClient } from "@/config";
export const getVisitors = async () => {
  try {
    const response = await httpClient.get(`/visitors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bars:", error);
    throw error;
  }
};

import { httpClient } from "@/config";
export const getUsers = async (page: number, limit: number = 10) => {
  try {
    const response = await httpClient.get(`/users`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

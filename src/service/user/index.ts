import { httpClient } from "@/config";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

import { useAppSelector } from "@/state/hooks";

export const getUserProfile = async (userId: string) => {
  return await httpClient.get(`/user/${userId}/profile`);
};

export const useFetchAdminProfile = () => {
  const { profile } = useAppSelector((state) => state.user);

  const result = useQuery({
    queryFn: () => getUserProfile(profile?._id),
    queryKey: [QUERY_KEYS.USER_PROFILE],
    enabled: Boolean(profile?._id),
  });

  return { ...result, user: result.data?.data };
};

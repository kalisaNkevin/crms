import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BASE_API_URL } from "@/config";
import { type LoginResponse } from "../types";
import { QUERY_KEYS } from "../query-keys";
import { setCookies } from "@/lib/storage";
import { AUTH_TOKENS } from "@/lib/constants";
import { useAppDispatch } from "@/state/hooks";
import { setUserProfile } from "@/state/auth/reducer";
import { useToast } from "@/components/ui/use-toast";

type SigninPayload = {
  email: string;
  password: string;
};

export async function signIn({
  email,
  password,
}: SigninPayload): Promise<LoginResponse> {
  const response = await axios.post(`${BASE_API_URL}/auth/login/`, {
    email,
    password,
    authorizationType: "admin_authentication",
  });
  return response.data;
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation<LoginResponse, unknown, SigninPayload, unknown>({
    mutationFn: (args: SigninPayload) => signIn(args),
    mutationKey: [QUERY_KEYS.USER_PROFILE],

    onSuccess: (data) => {
      queryClient.invalidateQueries();
      setCookies(AUTH_TOKENS.IRON_KEY_ADMIN, JSON.stringify(data.data.token));

      dispatch(
        setUserProfile({ profile: data.data.profile, token: data.data.token }),
      );
      router.push("/dashboard");
    },

    onError: (error: unknown) => {
      if (isAxiosError(error))
        toast({
          variant: "error",
          title: "Login Error",
          description: error.response?.data.message?.clientMsg,
        });
    },
  });
}

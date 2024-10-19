import {
  IWalletL2Payload,
  IWalletPayload,
  IWalletResponse,
} from "@/types/wallets";
import { baseAPI } from "../api";

const walletEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    wallet: builder.mutation<IWalletResponse, IWalletPayload>({
      query: (body) => ({
        url: "automation/generate-l1-wallet",
        method: "POST",
        body,
      }),
    }),
    walletl2: builder.mutation<IWalletResponse, IWalletL2Payload>({
      query: (body) => ({
        url: "lifiautomation/generate-l2-wallet",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useWalletMutation, useWalletl2Mutation } = walletEndpoints;

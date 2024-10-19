import { baseAPI } from "../api";
import { ITransferPayload, ITransferResponse } from "@/types";

const withdrawEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    transfer: builder.mutation<ITransferResponse, ITransferPayload>({
      query: (body) => ({
        url: "lifiautomation/cross-chain-transfer",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useTransferMutation } = withdrawEndpoints;

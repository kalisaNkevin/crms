import { baseAPI } from "../api";
import { ITransactionPayload, ITransactionResponse } from "@/types";

const withdrawEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    withdraw: builder.mutation<ITransactionResponse, ITransactionPayload>({
      query: (body) => ({
        url: "binance/withdraw",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useWithdrawMutation } = withdrawEndpoints;

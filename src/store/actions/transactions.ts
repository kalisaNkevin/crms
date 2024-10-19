import { GenericResponse, ITransfer } from "@/types";
import { baseAPI } from "../api";
import { ITransactions } from "@/types/transactions";
import { IWallets } from "@/types/wallets";

const transactionsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    walletL1Transactions: builder.query<
      GenericResponse<{ data: IWallets[] }>,
      void
    >({
      query: () => ({
        url: `wallet/layer-one`,
        method: "GET",
      }),
    }),
    walletL2Transactions: builder.query<
      GenericResponse<{ data: IWallets[] }>,
      void
    >({
      query: () => ({
        url: `wallet/layer-two`,
        method: "GET",
      }),
    }),
    binanceTransactions: builder.query<
      GenericResponse<{ data: ITransactions[] }>,
      void
    >({
      query: () => ({
        url: `binance/transactions`,
        method: "GET",
      }),
    }),
    transferTransactions: builder.query<
      GenericResponse<{ data: ITransfer[] }>,
      void
    >({
      query: () => ({
        url: `transaction`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useBinanceTransactionsQuery,
  useWalletL1TransactionsQuery,
  useWalletL2TransactionsQuery,
  useTransferTransactionsQuery,
} = transactionsEndpoints;

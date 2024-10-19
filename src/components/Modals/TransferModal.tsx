import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DialogTitle } from "@/components/ui/dialog";
import { withdrawsSchema } from "@/lib/formSchema";
import { MainModal } from "./MainModal";
import { FC, useEffect, useMemo } from "react";
import { Plus, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import {
  useWalletL1TransactionsQuery,
  useWalletL2TransactionsQuery,
} from "@/store/actions/transactions";
import { IWallets } from "@/types/wallets";
import { ReloadIcon } from "@radix-ui/react-icons";

interface TransferModalProps {
  open: boolean;
  onDismiss: () => void;
  onSubmit: (values: z.infer<typeof withdrawsSchema>) => void;
  isLoading: boolean;
}

const WithdrawForm: FC<{
  onSubmit: (values: z.infer<typeof withdrawsSchema>) => void;
  isLoading: boolean;
}> = ({ onSubmit, isLoading }) => {
  const [transactionType, setTransactionType] = useState<string | undefined>();

  const form = useForm<z.infer<typeof withdrawsSchema>>({
    resolver: zodResolver(withdrawsSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "wallets",
  });

  const addDestinationField = () => {
    append({
      source: "",
      destination: "",
    });
  };

  const { data: l1Data, isLoading: isFetchingL1 } =
    useWalletL1TransactionsQuery();
  const { data: l2Data, isLoading: isFetchingL2 } =
    useWalletL2TransactionsQuery();

  const walletLayer1Data: IWallets[] = useMemo(
    () => (l1Data?.data ?? []) as IWallets[],
    [l1Data],
  );
  const walletLayer2Data: IWallets[] = useMemo(
    () => (l2Data?.data ?? []) as IWallets[],
    [l2Data],
  );

  useEffect(() => {
    // Any side effects based on walletData can be handled here
  }, [walletLayer1Data, walletLayer2Data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-5 ">
          <FormField
            control={form.control}
            name="fromChain"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="fromChain">From Chain</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fromToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="fromToken">From Coin</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toChain"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="toChain">To Chain</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="toToken">To Coin</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="amount">Amount</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="transactionType">Transaction Type</FormLabel>
              <FormControl>
                <Select
                  value={transactionType}
                  onValueChange={(value) => {
                    setTransactionType(value);
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="l1ToL2">
                      From Layer 1 👉 to Layer 2 Wallet
                    </SelectItem>
                    <SelectItem value="l2ToL2">
                      From Layer 2 👉 to Layer 2 Wallet
                    </SelectItem>
                    <SelectItem value="l2ToL1">
                      From Layer 2 👉 to Layer 1 Wallet
                    </SelectItem>
                    <SelectItem value="l1ToL1">
                      From Layer 1 👉 to Layer 1 Wallet
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {transactionType && (
          <FormField
            control={form.control}
            name="wallets"
            render={() => (
              <FormItem>
                <FormLabel id="walletAddress">Wallets’ Addresses</FormLabel>
                <FormControl>
                  <Card className="pt-4 h-44 overflow-y-auto">
                    <CardContent className="flex flex-col gap-3">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex flex-col gap-3 items-start"
                        >
                          <div className="flex gap-3 items-center justify-center w-full">
                            <span className="mt-4">{index + 1}.</span>
                            <div className="flex flex-col flex-1 gap-4">
                              {index === 0 && <FormLabel>Source</FormLabel>}
                              <FormControl>
                                <Controller
                                  control={form.control}
                                  name={`wallets.${index}.source`}
                                  render={({ field }) => (
                                    <Select
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select Address" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {(transactionType === "l1ToL2" ||
                                          transactionType === "l1ToL1") &&
                                          isFetchingL1 && (
                                            <div className="flex items-center justify-center h-full">
                                              <ReloadIcon className="h-12 w-12 text-black animate-spin" />
                                            </div>
                                          )}
                                        {(transactionType === "l2ToL2" ||
                                          transactionType === "l2ToL1") &&
                                          isFetchingL2 && (
                                            <div className="flex items-center justify-center h-full">
                                              <ReloadIcon className="h-12 w-12 text-black animate-spin" />
                                            </div>
                                          )}
                                        {(transactionType === "l1ToL2" ||
                                          transactionType === "l1ToL1") &&
                                          walletLayer1Data.map(
                                            (wallet, idx) => (
                                              <SelectItem
                                                key={idx}
                                                value={wallet.address}
                                              >
                                                {wallet.address}
                                              </SelectItem>
                                            ),
                                          )}
                                        {(transactionType === "l2ToL2" ||
                                          transactionType === "l2ToL1") &&
                                          walletLayer2Data.map(
                                            (wallet, idx) => (
                                              <SelectItem
                                                key={idx}
                                                value={wallet.address}
                                              >
                                                {wallet.address}
                                              </SelectItem>
                                            ),
                                          )}
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                              </FormControl>
                            </div>
                            <div className="flex flex-col flex-1 gap-4">
                              {index === 0 && (
                                <FormLabel>Destination</FormLabel>
                              )}
                              <FormControl>
                                <Controller
                                  control={form.control}
                                  name={`wallets.${index}.destination`}
                                  render={({ field }) => (
                                    <Select
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select Address" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {(transactionType === "l1ToL2" ||
                                          transactionType === "l2ToL2") &&
                                          isFetchingL2 && (
                                            <div className="flex items-center justify-center h-full">
                                              <ReloadIcon className="h-12 w-12 text-black animate-spin" />
                                            </div>
                                          )}
                                        {(transactionType === "l2ToL1" ||
                                          transactionType === "l1ToL1") &&
                                          isFetchingL1 && (
                                            <div className="flex items-center justify-center h-full">
                                              <ReloadIcon className="h-12 w-12 text-black animate-spin" />
                                            </div>
                                          )}
                                        {(transactionType === "l1ToL2" ||
                                          transactionType === "l2ToL2") &&
                                          walletLayer2Data.map(
                                            (wallet, idx) => (
                                              <SelectItem
                                                key={idx}
                                                value={wallet.address}
                                              >
                                                {wallet.address}
                                              </SelectItem>
                                            ),
                                          )}
                                        {(transactionType === "l2ToL1" ||
                                          transactionType === "l1ToL1") &&
                                          walletLayer1Data.map(
                                            (wallet, idx) => (
                                              <SelectItem
                                                key={idx}
                                                value={wallet.address}
                                              >
                                                {wallet.address}
                                              </SelectItem>
                                            ),
                                          )}
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                              </FormControl>
                            </div>
                            <Button
                              type="button"
                              size="icon"
                              className={`bg-white border border-gray-400 h-12 w-14 text-black ${index === 0 ? "mt-8" : ""}`}
                              onClick={() => remove(index)}
                            >
                              <X />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-start w-full">
                        <Button
                          type="button"
                          size="icon"
                          className="bg-[#F7F7F7] text-black w-12 h-12 ml-5"
                          onClick={addDestinationField}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Transfer..." : "Transfer"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const TransferModal: FC<TransferModalProps> = ({
  open,
  onDismiss,
  onSubmit,
  isLoading,
}) => {
  return (
    <MainModal open={open} modalSize="large" onDismiss={onDismiss}>
      <div className="w-full p-2">
        <div className="flex items-center py-1 justify-between border-b">
          <DialogTitle>Transfer</DialogTitle>
        </div>
        <div className="mt-8">
          <WithdrawForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </MainModal>
  );
};

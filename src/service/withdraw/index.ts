import { useToast } from "@/components/ui/use-toast";
import { httpClient } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";

type WithdrawFunds = {
  amount: number;
  wallet: string;
  isUSDC: boolean;
};

export const withdrawFunds = async (payload: WithdrawFunds) => {
  const response = await httpClient.post("/transaction/withdraw", payload);

  return response;
};

export const useWithdrawFunds = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdrawFunds,
    onSuccess: (response: AxiosResponse) => {
      queryClient.invalidateQueries();
      toast({
        title: "Withdrawal",
        variant: "success",
        description: response?.data?.message?.clientMsg,
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast({
          title: "Withdrawal",
          variant: "error",
          description: error?.response?.data?.message?.clientMsg,
        });
      }
    },
  });
};

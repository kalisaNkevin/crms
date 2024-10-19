import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { walletNumberSchema } from "@/lib/formSchema";
import { MainModal } from "./MainModal";
import { FC } from "react";
import { DialogTitle } from "@/components/ui/dialog";

interface GenerateWalletsModalProps {
  open: boolean;
  onDismiss: () => void;
  onSubmit: (values: z.infer<typeof walletNumberSchema>) => void;
  isLoading: boolean;
}

const GenerateWalletsForm: FC<{
  onSubmit: (values: z.infer<typeof walletNumberSchema>) => void;
  isLoading: boolean;
}> = ({ onSubmit, isLoading }) => {
  const form = useForm<z.infer<typeof walletNumberSchema>>({
    resolver: zodResolver(walletNumberSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="total">Number of wallets</FormLabel>
              <FormControl>
                <Input
                  id="total"
                  type="text"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const GenerateWalletsModal: FC<GenerateWalletsModalProps> = ({
  open,
  onDismiss,
  onSubmit,
  isLoading,
}) => {
  return (
    <MainModal open={open} onDismiss={onDismiss}>
      <div className="w-full p-2">
        <div className="flex items-center justify-between py-1 border-b">
          <DialogTitle>Generate new Wallets</DialogTitle>
        </div>
        <div className="mt-8">
          <GenerateWalletsForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </MainModal>
  );
};

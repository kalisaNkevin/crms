import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { DialogTitle } from "@/components/ui/dialog";
import { customerSchema } from "@/lib/formSchema";
import { MainModal } from "./MainModal";
import { FC } from "react";

interface CustomerModalProps {
  open: boolean;
  onDismiss: () => void;
  onSubmit: (values: z.infer<typeof customerSchema>) => void;
  isLoading: boolean;
}

const CustomerForm: FC<{
  onSubmit: (values: z.infer<typeof customerSchema>) => void;
  isLoading: boolean;
}> = ({ onSubmit, isLoading }) => {
  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="name">Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="email">Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="signupDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="signupDate">Signup Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastActivity"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="lastActivity">Last Activity</FormLabel>
              <FormControl>
                <Input type="date" {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const CustomerModal: FC<CustomerModalProps> = ({
  open,
  onDismiss,
  onSubmit,
  isLoading,
}) => {
  return (
    <MainModal open={open} onDismiss={onDismiss}>
      <div className="w-full p-2">
        <div className="flex items-center py-1 justify-between border-b">
          <DialogTitle>Add New Customer</DialogTitle>
        </div>
        <div className="mt-8">
          <CustomerForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </MainModal>
  );
};
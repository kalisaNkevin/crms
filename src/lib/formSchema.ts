import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean(),
});

export const userDetailsSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email("Email is required"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm Password does not match",
  }),
});

export const walletNumberSchema = z.object({
  total: z.string().min(1, { message: "Total is required" }),
});

export const withdrawSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  coin: z.string().min(1, { message: "Coin is required" }),
});

export const withdrawsSchema = z.object({
  fromChain: z.string().min(1, { message: "From Chain is required" }),
  toChain: z.string().min(1, { message: "To Chain is required" }),
  fromToken: z.string().min(1, { message: "From Coin is required" }),
  toToken: z.string().min(1, { message: "To Coin is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  transactionType: z
    .string()
    .min(1, { message: "Transaction Type is required" }),
  wallets: z.array(
    z.object({
      source: z.string().min(1, { message: "Source address is required" }),
      destination: z
        .string()
        .min(1, { message: "Destination address is required" }),
    })
  ),
});

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  signupDate: z.string().min(1, "Signup date is required"),
  lastActivity: z.string().min(1, "Last activity date is required"),
});

export const wireSchema = z.object({
  fromChain: z.string().min(1, { message: "From Chain is required" }),
  toChain: z.string().min(1, { message: "To Chain is required" }),
  fromToken: z.string().min(1, { message: "From Token is required" }),
  toToken: z.string().min(1, { message: "To Token is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  wallets: z.array(
    z.object({
      source: z.string().min(1, { message: "Source address is required" }),
      destination: z
        .string()
        .min(1, { message: "Destination address is required" }),
    })
  ),
});

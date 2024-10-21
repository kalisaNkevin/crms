import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean(),
});

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  signupDate: z.string().min(1, "Signup date is required"),
  lastActivity: z.string().min(1, "Last activity date is required"),
});

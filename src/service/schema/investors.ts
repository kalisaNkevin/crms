import { z } from "zod";

const InvestorSchema = z.object({
  _id: z.string(),
  isDeleted: z.boolean(),
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string().url(),
  status: z.union([
    z.literal("pending"),
    z.literal("approved"),
    z.literal("rejected"),
  ]),
  idCardImage: z.string().url(),
  walletAddress: z.string(),
  role: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  __v: z.number(),
});

const PaginationSchema = z.object({
  total: z.number(),
  count: z.number(),
  limit: z.number(),
  pages: z.number(),
});

const DataSchema = z.object({
  investors: z.array(InvestorSchema),
  pagination: PaginationSchema,
});

export const InvestorApiResponseSchema = z.object({
  data: DataSchema,
});

export type TInvestor = z.infer<typeof InvestorApiResponseSchema>;
export type TInvestorSchema = z.infer<typeof InvestorSchema>;

import { z } from "zod";

const SyndicateLeaderSchema = z.object({
  _id: z.string(),
  isDeleted: z.boolean(),
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string().url(),
  idCardImage: z.string().url(),
  status: z.union([
    z.literal("pending"),
    z.literal("approved"),
    z.literal("rejected"),
  ]),
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
  syndicateLeaders: z.array(SyndicateLeaderSchema),
  pagination: PaginationSchema,
});

export const SyndicateLeaderApiResponse = z.object({
  data: DataSchema,
});

export type TSyndicateLeaderData = z.infer<typeof SyndicateLeaderApiResponse>;
export type TSyndicateLeader = z.infer<typeof SyndicateLeaderSchema>;

export type UserSchema = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive?: boolean;
  email: string;
  shippingAddress: string;
  stripeAccountId: string;
  currency: string;
};
export type UserInitialState = {
  user?: UserSchema;
  verifyEmail?: string;
};

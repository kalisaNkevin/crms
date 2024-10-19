export type ITransactions = {
  id: number;
  coin: string;
  amount: string;
  address: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  message: string;
};

export type ITransactionsResponse = {
  data: ITransactions[];
};

// Define the type for the transaction payload
export interface ITransactionPayload {
  coin: string;
  address: string;
  amount: string;
}

export interface ICustomerSchema {
  name: string;
  email: string;
  signupDate: Date;
  lastActivity: Date;
}

export interface ICustomerResponse {
  statusCode: string;
  message: string;
}

// Define the type for the transaction response
export interface ITransactionResponse {
  statusCode: string;
  message: string;
}

export interface ICustomerSchema {
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  residence: string;
  email: string;
  signUpDate: string;
  lastActivity: string;
}

export interface ICustomerResponse {
  statusCode: string;
  message: string;
}

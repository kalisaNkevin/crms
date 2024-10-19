export type ILoginPayload = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  statusCode: string;
  message: string;
  data: {
    accessToken: string;
    user: {
      name: string;
      phoneNo: string;
      gender: string;
      _id: string;
      email: string;
      role: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      confirmEmailToken: string;
    };
  };
};

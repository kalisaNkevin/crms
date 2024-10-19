export type Token = {
  expireTime: number;
  value: string;
};

export type TUserProfile = {
  _id: string;
  isDeleted: boolean;
  firstName: string;
  lastName: string;
  profileImage: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: string;
};

export type TUser = {
  token: Token;
  profile: TUserProfile;
};

export type LoginResponse = {
  data: TUser;
};

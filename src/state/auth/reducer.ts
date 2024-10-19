import { AUTH_TOKENS } from "@/lib/constants";
import { removeCookies } from "@/lib/storage";
import { TUser, TUserProfile, Token } from "@/service/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  profile: TUserProfile;
  token: Token;
};
const initialState = {
  profile: {},
  token: {},
} as User;

export const userProfile = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<Partial<TUser>>) => {
      state.profile = { ...state.profile, ...action.payload.profile };
      state.token = { ...state.token, ...action.payload.token };
    },

    removeUser: (state) => {
      state.profile = null as unknown as TUserProfile;
      state.token = null as unknown as Token;
      removeCookies(AUTH_TOKENS.IRON_KEY_ADMIN);
      window.location.href = "/auth/login";
    },
  },
});

export const { setUserProfile, removeUser } = userProfile.actions;
export default userProfile.reducer;

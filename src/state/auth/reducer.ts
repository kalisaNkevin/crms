import { TOKEN_NAME } from "@/lib/constants";
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

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<Partial<TUser>>) => {
      state.profile = { ...state.profile, ...action.payload.profile };
      state.token = { ...state.token, ...action.payload.token };
    },

    removeUser: (state) => {
      state.profile = null as unknown as TUserProfile;
      state.token = null as unknown as Token;
      removeCookies(TOKEN_NAME);
      window.location.href = "/";
    },
  },
});

export const { setUserProfile, removeUser } = user.actions;
export default user.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  token?: string;
} = {
  token: undefined,
};

export const appSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      const { payload } = action;
      state.token = payload;
    },
    clearToken: (state) => {
      state.token = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, clearToken } = appSlice.actions;

export default appSlice.reducer;

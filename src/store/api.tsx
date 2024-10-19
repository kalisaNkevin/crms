import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API } from "../config/env";
import { RootState } from "./index";

export const baseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: async (headers, { getState }) => {
      const {
        appReducer: { token },
      } = getState() as RootState;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});

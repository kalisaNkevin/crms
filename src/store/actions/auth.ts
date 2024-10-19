import { ILoginPayload, ILoginResponse } from "../../types";
import { baseAPI } from "../api";

const userEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (body) => ({
        url: "public/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = userEndpoints;

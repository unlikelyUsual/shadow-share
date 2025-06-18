import type { ILoginRespone, LoginType } from "../../types/UserType";
import { apiSlice } from "../apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<ILoginRespone, LoginType>({
      query: (payload: LoginType) => ({
        url: `users/login`,
        method: "POST",
        body: {
          emailOrUserName: payload.username,
          password: payload.password,
        },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = userSlice;

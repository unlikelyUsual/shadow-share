import type {
  ILoginRespone,
  LoginType,
  TRegisterUser,
} from "../../types/UserType";
import { apiSlice } from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
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
    register: builder.mutation<unknown, TRegisterUser>({
      query: (payload: TRegisterUser) => ({
        url: "users/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterMutation } = userApi;

import type {
  ILoginRespone,
  LoginType,
  TGetUser,
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
    getUser: builder.query<TGetUser, null>({
      query: () => ({
        url: "users/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterMutation } = userApi;

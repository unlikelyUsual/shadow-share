import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootStateType } from "../store";
import { BASE_URL } from "../util/Constants";
import ToastHelper from "../util/ToastHelper";
import { logout } from "./user/userSlice";

const fetchQuery = fetchBaseQuery({
  baseUrl: BASE_URL + "/api/v1/",
  prepareHeaders: (headers: Headers, { getState }) => {
    const rootState: RootStateType = getState() as RootStateType;
    const token = rootState.user.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
  },
});

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const result = await fetchQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    ToastHelper.error("Session Expired");
    api.dispatch(logout());
    window.location.href = "/login";
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});

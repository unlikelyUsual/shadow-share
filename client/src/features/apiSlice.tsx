import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useNavigate } from "react-router";
import type { RootStateType } from "../store";
import { BASE_URL } from "../util/Constants";
import { logout } from "./user/userSlice";

const navigate = useNavigate();

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

  if (result?.error?.status === 401) {
    api.dispatch(logout());
    navigate("/login");
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});

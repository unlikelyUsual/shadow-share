import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { decodeToken } from "../../api/jwt";
import { createAppAsyncThunk } from "../../api/thunk";
import type { ILoginRespone, LoginType, UserType } from "../../types/UserType";

export type UserStoreType = {
  user: UserType | null;
  status?: "success" | "failed" | "pending";
  error?: string;
  token: string | null;
};

export const initialState: UserStoreType = {
  user: null,
  token: null,
  error: "",
  status: "success",
};

export const loginUser = createAppAsyncThunk(
  "user/login",
  async (payload: LoginType) => {
    const response = await client.post<ILoginRespone>("/api/v1/users/login", {
      emailOrUserName: payload.username,
      password: payload.password,
    });
    return response.data;
  }
);

export const slice = createSlice({
  initialState: initialState,
  name: "userSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = decodeToken(action.payload.token);
        state.user = user;
        state.status = "success";
        state.token = action.payload.token;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export default slice.reducer;

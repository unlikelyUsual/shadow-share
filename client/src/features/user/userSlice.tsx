import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { decodeToken } from "../../api/jwt";
import { createAppAsyncThunk } from "../../api/thunk";
import type { ILoginRespone, LoginType, UserType } from "../../types/UserType";

export type UserInitialState = {
  user: UserType | null;
  loading?: boolean;
  token: string | null;
};

export const initialState: UserInitialState = { user: null, token: null };

export const loginUser = createAppAsyncThunk(
  "posts/addNewPost",
  async (payload: LoginType) => {
    const response = await client.post<ILoginRespone>(
      "/api/v1/users/login",
      payload
    );
    return response.data;
  }
);

export const slice = createSlice({
  initialState: initialState,
  name: "userSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const user = decodeToken(action.payload.token);
      state.user = user;
      state.token = action.payload.token;
      state.loading = false;
    }),
      builder.addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export default slice.reducer;

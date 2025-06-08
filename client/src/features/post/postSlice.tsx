import { createSlice } from "@reduxjs/toolkit";

export type PostInitiateState = { posts: any[]; loading?: boolean };

export const initialState: PostInitiateState = { posts: [], loading: false };

export const slice = createSlice({
  initialState: initialState,
  name: "postSlice",
  reducers: {},
  // extraReducers : {}
});

export default slice.reducer;

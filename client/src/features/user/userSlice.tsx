import { createSlice } from "@reduxjs/toolkit";

export type UserInitialState = { user: any; loading?: boolean };

export const initialState: UserInitialState = { user: null };

export const slice = createSlice({
  initialState: initialState,
  name: "userSlice",
  reducers: {},
  // extraReducers : {}
});

export default slice.reducer;

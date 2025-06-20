import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../types/UserType";

export type InitialStateType = {
  user: UserType | null;
};

const initialState: InitialStateType = {
  user: null,
};

export const userSlice = createSlice({
  initialState: initialState,
  name: "userReducer",
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalstorage } from "../../api/client";
import { decodeToken } from "../../api/jwt";
import type { TLoginUserJWT, UserType } from "../../types/UserType";
import { JWT_TOKEN } from "../../util/Constants";

export type InitialStateType = {
  user: UserType | null;
  token: string;
};

const { token, user } = getLocalStorage(JWT_TOKEN);

const initialState: InitialStateType = {
  user,
  token,
};

export const userSlice = createSlice({
  initialState: initialState,
  name: "userReducer",
  reducers: {
    logout: (state) => {
      setLocalstorage("");
      state.token = "";
      state.user = null;
    },
    setUser: (state, action: PayloadAction<string>) => {
      //TOKEN
      const token = action.payload;
      setLocalstorage(token);
      state.token = token;
      //USER
      const parsed: TLoginUserJWT = decodeToken(token);
      const { exp, iat, ...data } = parsed;
      state.user = data;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

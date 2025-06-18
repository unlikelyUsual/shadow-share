import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { apiSlice } from "./features/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type StoreType = typeof store;
export type DipatchType = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootStateType, unknown, Action>;
export const userAppDispatch = useDispatch.withTypes<DipatchType>();
export const userAppSelect = useSelector.withTypes<RootStateType>();

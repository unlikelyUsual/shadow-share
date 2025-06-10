import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import PostReducer from "./features/post/postSlice";
import UserReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    post: PostReducer,
  },
});

export type StoreType = typeof store;
export type DipatchType = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootStateType, unknown, Action>;

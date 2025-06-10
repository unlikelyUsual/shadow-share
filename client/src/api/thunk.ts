import { createAsyncThunk } from "@reduxjs/toolkit";

import type { DipatchType, RootStateType } from "../store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootStateType;
  dispatch: DipatchType;
}>();

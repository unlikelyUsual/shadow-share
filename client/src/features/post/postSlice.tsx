import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { createAppAsyncThunk } from "../../api/thunk";
import type {
  AddNewPost,
  GetPostReponse,
  PostModelType,
} from "../../types/PostType";

export type PostInitiateState = {
  posts: PostModelType[];
  status?: "success" | "failed" | "pending";
  error: string | null;
};

export const initialState: PostInitiateState = {
  posts: [],
  status: "success",
  error: null,
};

export const getPosts = createAppAsyncThunk("", async () => {
  const response = await client.get<GetPostReponse>("/api/v1/post/");
  return response.data;
});

export const addPost = createAppAsyncThunk(
  "/post/addNewPost",
  async (payload: AddNewPost) => {
    const response = await client.post("/api/v1/posts/post", payload);
    return response;
  }
);

export const slice = createSlice({
  initialState: initialState,
  name: "postSlice",
  reducers: {},
  // extraReducers : {}
});

export default slice.reducer;

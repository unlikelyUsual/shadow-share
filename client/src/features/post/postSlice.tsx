import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { createAppAsyncThunk } from "../../api/thunk";
import type {
  AddNewPost,
  AddNewPostRes,
  GetAllPostRes,
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
  const response = await client.get<GetAllPostRes>("/api/v1/post/all");
  return response.data;
});

export const addPost = createAppAsyncThunk(
  "/post/addNewPost",
  async (payload: AddNewPost) => {
    const response = await client.post<AddNewPostRes>(
      "/api/v1/posts/post",
      payload
    );
    return response;
  }
);

export const slice = createSlice({
  initialState: initialState,
  name: "postSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.status = "success";
      })
      .addCase(getPosts.pending, (state, action) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        getPosts();
      })
      .addCase(addPost.pending, (state, action) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export default slice.reducer;

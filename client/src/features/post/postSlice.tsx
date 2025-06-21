import type {
  AddNewPost,
  AddNewPostRes,
  GetAllPostRes,
} from "../../types/PostType";
import { apiSlice } from "../apiSlice";

export const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<GetAllPostRes, unknown>({
      query: () => ({ url: `posts/all` }),
    }),
    addPost: builder.mutation<AddNewPostRes, AddNewPost>({
      query: (payload) => ({
        url: "posts/post",
        body: payload,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = postSlice;

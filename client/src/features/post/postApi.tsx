import type {
  AddNewPost,
  AddNewPostRes,
  GetAllPostRes,
  TGetAllPostQuery,
} from "../../types/PostType";
import { apiSlice } from "../apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<GetAllPostRes, TGetAllPostQuery>({
      query: () => ({ url: `posts/all` }),
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation<AddNewPostRes, AddNewPost>({
      query: (payload) => ({
        url: "posts/post",
        body: payload,
        method: "POST",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = postApi;

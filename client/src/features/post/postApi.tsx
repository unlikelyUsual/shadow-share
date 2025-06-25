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
      query: (p: TGetAllPostQuery) => {
        const params = new URLSearchParams();
        params.set("limit", p.limit.toString());
        if (p.idCursor && p.timestampCursor) {
          params.set("idCursor", p.idCursor.toString());
          params.set("timestampCursor", p.timestampCursor.toString());
        }
        return { url: `posts/all?${params.toString()}`, method: "GET" };
      },
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

import type {
  AddNewPost,
  AddNewPostRes,
  GetAllPostRes,
} from "../../types/PostType";
import { apiSlice } from "../apiSlice";

export const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<GetAllPostRes, void>({
      query: () => ({ url: `post/all` }),
    }),
    addPost: builder.mutation<AddNewPostRes, AddNewPost>({
      query: (payload) => ({ url: "posts/post", body: payload }),
    }),
  }),
});

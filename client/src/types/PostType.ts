import type { UserModelType } from "./UserType";

export type PostModelType = {
  id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostType = Partial<PostModelType>;

export type AddNewPost = Pick<PostModelType, "title" | "content">;

export type AddNewPostRes = {
  post: PostType;
  message: string;
};

export type TGetAllPostModel = {
  posts: PostModelType;
  user: UserModelType;
};

export type GetAllPostRes = {
  posts: TGetAllPostModel[];
  message: string;
};

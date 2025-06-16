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

export type GetAllPostRes = {
  posts: PostModelType[];
  message: string;
};

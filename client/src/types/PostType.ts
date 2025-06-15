export type PostModelType = {
  id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostType = Partial<PostModelType>;

export type GetPostReponse = PostModelType[];

export type AddNewPost = Pick<PostModelType, "title" | "content" | "userId">;

import { desc, eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../config/db.config";
import { PostTable } from "../db/PostTable";
import { UserTable } from "../db/UserTable";
import ErrorHandler from "../util/ErrorHandler";

class PostController {
  createPost = async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;
      const { id } = req.body.user;
      const post: any = {
        title,
        content,
        userId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const savedPost = await db.insert(PostTable).values(post);
      return res.json({
        post: savedPost,
        message: `Created!`,
      });
    } catch (err) {
      return ErrorHandler.handleError(res, err);
    }
  };

  getAllPosts = async (req: Request, res: Response) => {
    try {
      const user = await db
        .select({
          id: UserTable.id,
          name: UserTable.name,
          username: UserTable.username,
        })
        .from(UserTable)
        .as("user");

      const posts = await db
        .select()
        .from(PostTable)
        .innerJoin(user, eq(PostTable.userId, user.id))
        .orderBy(desc(PostTable.updatedAt));

      return res.json({ posts, message: "Fetched!" });
    } catch (err) {
      return ErrorHandler.handleError(res, err);
    }
  };
}

export default PostController;

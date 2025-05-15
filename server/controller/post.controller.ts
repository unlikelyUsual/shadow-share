import { desc } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../config/db.config";
import { PostTable } from "../db/PostTable";
import ErrorHandler from "../util/ErrorHandler";

class PostController {
  createPost = async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;
      const { id } = req.body.user;
      const post: any = {
        title,
        content,
        user: id,
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
      const rows = await db
        .select()
        .from(PostTable)
        .orderBy(desc(PostTable.updatedAt));
      return res.json({ rows });
    } catch (err) {
      return ErrorHandler.handleError(res, err);
    }
  };
}

export default PostController;

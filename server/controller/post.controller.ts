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
      const { rowCount } = await db.insert(PostTable).values(post);
      return res.json({
        post,
        message: `${rowCount > 0 ? "Created!" : "Done"}`,
      });
    } catch (err) {
      return ErrorHandler.handleError(res, err);
    }
  };

  getAllPosts = async (req: Request, res: Response) => {
    const rows = await db.select().from(PostTable);
    return res.json({ rows });
  };
}

export default PostController;

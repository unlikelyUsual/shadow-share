import { and, desc, eq, lt } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../config/db.config";
import { GetAllPostType, PostTable } from "../db/PostTable";
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
      const {
        limit = 2,
        idCursor,
        timestampCursor,
      } = req.query as GetAllPostType;
      console.log(`Params : `, req.query);
      const user = db
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
        .where(
          idCursor && timestampCursor
            ? and(
                lt(PostTable.id, Number(idCursor)),
                lt(PostTable.updatedAt, new Date(timestampCursor))
              )
            : undefined
        )
        .orderBy(desc(PostTable.updatedAt), desc(PostTable.id))
        .limit(Number(limit));

      return res.json({ posts, message: "Fetched!" });
    } catch (err) {
      return ErrorHandler.handleError(res, err);
    }
  };
}

export default PostController;

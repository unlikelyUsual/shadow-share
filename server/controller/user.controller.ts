import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../config/db.config";
import { UserTable, userTypeEnum } from "../db/UserTable";
import ErrorHandler from "../util/ErrorHandler";

export default class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, username } = req.body as any;

      const user = {
        name,
        email,
        username,
        role: userTypeEnum.enumValues[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { rowCount } = await db.insert(UserTable).values(user);

      return res.json({
        user,
        message: `${rowCount > 0 ? "Created!" : "Done"}`,
      });
    } catch (err) {
      return ErrorHandler.handleError(res, err);
    }
  };
  getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.path as any;

      const rows = await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.id, id));

      return res.json({
        user: rows[0],
        message: `Fetched!`,
      });
    } catch (err) {
      return ErrorHandler.handleError(res, err);
    }
  };
}

import bcrypt from "bcrypt";
import { desc, eq, or } from "drizzle-orm";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.env";
import { db } from "../config/db.config";
import { PostTable } from "../db/PostTable";
import { UserTable, userTypeEnum } from "../db/UserTable";
import ErrorHandler from "../util/ErrorHandler";

export default class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, username, password } = req.body as any;

      const results = await db
        .select()
        .from(UserTable)
        .where(
          or(eq(UserTable.email, email), eq(UserTable.username, username))
        );

      if (results.length > 0) {
        return res.status(400).json({ message: "User already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        name,
        email,
        username,
        password: hashedPassword,
        role: userTypeEnum.enumValues[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log("Adding user to table", user);

      const { rowCount } = await db.insert(UserTable).values(user);

      return res.json({
        message: `${rowCount > 0 ? "Created!" : "Done"}`,
      });
    } catch (err) {
      return ErrorHandler.handleError(res, err);
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.body.user as any;

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

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const users = await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.email, email));

      if (users.length == 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = users[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid credential" });
      }

      const token = jwt.sign(
        { name: user.name, email: user.email, id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({ token });
    } catch (err) {
      return ErrorHandler.handleError(res, err);
    }
  };

  posts = async (req: Request, res: Response) => {
    try {
      const { id } = req.body.user;

      const posts = await db
        .select()
        .from(PostTable)
        .where(eq(PostTable.userId, id))
        .orderBy(desc(PostTable.updatedAt));

      return res.json({ posts, message: "Fetch!" });
    } catch (err) {
      return ErrorHandler.handleError(res, err);
    }
  };
}

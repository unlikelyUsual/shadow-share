import { NextFunction, Request, Response } from "express";
import { insertPostSchema } from "../db/PostTable";

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = insertPostSchema.parse(req.body);
    console.log("Middleware :");
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err?.issues });
  }
};

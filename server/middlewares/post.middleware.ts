import { NextFunction, Request, Response } from "express";
import { insertPostSchema } from "../db/PostTable";

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  try {
    insertPostSchema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: err?.issues });
  }
};

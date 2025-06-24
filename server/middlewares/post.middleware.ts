import { NextFunction, Request, Response } from "express";
import { getAllPostSchema, insertPostSchema } from "../db/PostTable";

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  try {
    insertPostSchema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: err?.issues });
  }
};

export const getAllPost = (req: Request, res: Response, next: NextFunction) => {
  try {
    getAllPostSchema.parse(req.query);
    next();
  } catch (err) {
    res.status(400).json({ message: err?.issues });
  }
};

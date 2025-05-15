import { NextFunction, Request, Response } from "express";
import { loginUserSchema, registerUserSchema } from "../db/UserTable";

export const registerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    registerUserSchema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: err?.issues });
  }
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    loginUserSchema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: err?.issues });
  }
};

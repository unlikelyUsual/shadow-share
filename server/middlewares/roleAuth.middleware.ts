import { NextFunction, Request, Response } from "express";
import { adminRole, userRole } from "../db/UserTable";

const roleAuth =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.user) {
      const { role: extractedRole } = req.body.user;
      if (role === adminRole || role === userRole) {
        role !== extractedRole
          ? res.status(400).json({ error: "Invalid role" })
          : next();
      } else res.status(400).json({ error: "Invalid role" });
    } else res.status(401).json({ error: "Not allowed" });
  };

export default roleAuth;

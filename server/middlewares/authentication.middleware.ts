import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.env";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  // Handle the case where authHeader could be a string or an array
  const headerValue: string = Array.isArray(authHeader)
    ? authHeader[0]
    : authHeader || "";

  console.log("Has authentication header : ", Boolean(headerValue));

  if (headerValue) {
    const token = headerValue.split(/\s+/)[1];

    verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ error: "Invalid token" });
      }
      req.body.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
};

export default authentication;

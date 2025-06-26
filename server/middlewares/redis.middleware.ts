import { NextFunction, Request, Response } from "express";
import Redis from "../config/redis.config";

const redisMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = req.route;
    const query = req.query;
    const key = `${url}:${query}`;
    const data = Redis.get(key);
    if (data) {
      console.log("Fetched from the cache");
      res.json(data);
    } else next();
  } catch (err) {
    console.error("Error in redis middleware : ", err);
    res.status(500).json({ message: "Error in redis middleware" });
  }
};

export default redisMiddleware;

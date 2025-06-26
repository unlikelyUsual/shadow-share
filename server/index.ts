import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { pool } from "./config/db.config";
import Redis from "./config/redis.config";
import postRouter from "./routes/post.route";
import userRouter from "./routes/user.route";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
dotenv.config();
Redis.connect();

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.get("/ping", (req, res) => {
  res.send("pong!🏓");
});

const server = app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

  server.close(async () => {
    console.log("HTTP server closed.");

    try {
      // Close Redis connection
      await Redis.close();
      console.log("Redis connection closed.");

      // Close PostgreSQL connection pool
      await pool.end();
      console.log("PostgreSQL connection pool closed.");

      console.log("Graceful shutdown completed.");
      process.exit(0);
    } catch (error) {
      console.error("Error during graceful shutdown:", error);
      process.exit(1);
    }
  });
};

// Handle different termination signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection");
});

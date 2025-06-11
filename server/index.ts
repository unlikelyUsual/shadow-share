import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectRedis from "./config/redis.config";
import postRouter from "./routes/post.route";
import userRouter from "./routes/user.route";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
dotenv.config();
connectRedis();

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.get("/ping", (req, res) => {
  res.send("pong!🏓");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

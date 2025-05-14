import dotenv from "dotenv";
import express from "express";
import connect from "./config/redis.config";
import postRouter from "./routes/post.route";

const app = express();
const port = 3000;

app.use(express.json());
dotenv.config();
connect();

app.use("/api/v1/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

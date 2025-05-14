import { Router } from "express";
import PostController from "../controller/post.controller";
import { createPost } from "../middlewares/post.middleware";
import middlewareHandler from "../util/middlewareHandler";

const router = Router();
const controller = new PostController();

router.post(
  "/post",
  middlewareHandler([createPost]),
  controller.createPost as any
);

router.get("/get", (req, res): any => {
  return res.json({ message: "done" });
});

export default router;

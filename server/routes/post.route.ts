import { Router } from "express";
import PostController from "../controller/post.controller";
import authentication from "../middlewares/authentication.middleware";
import { createPost, getAllPost } from "../middlewares/post.middleware";
import middlewareHandler from "../util/middlewareHandler";

const router = Router();
const controller = new PostController();

router.post(
  "/post",
  middlewareHandler([createPost, authentication]),
  controller.createPost as any
);

router.get(
  "/all",
  middlewareHandler([authentication, getAllPost]),
  controller.getAllPosts as any
);

export default router;

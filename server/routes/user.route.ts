import { Router } from "express";
import UserController from "../controller/user.controller";
import authentication from "../middlewares/authentication.middleware";
import redisMiddleware from "../middlewares/redis.middleware";
import {
  loginUser,
  registerUser,
} from "../middlewares/userValidation.middleware";
import middlewareHandler from "../util/middlewareHandler";

const router = Router();
const controller = new UserController();

router.post(
  "/register",
  middlewareHandler([registerUser]),
  controller.createUser as any
);

router.post("/login", middlewareHandler([loginUser]), controller.login as any);

router.get(
  "/user",
  middlewareHandler([authentication, redisMiddleware]),
  controller.getUser as any
);

router.get(
  "/posts",
  middlewareHandler([authentication, redisMiddleware]),
  controller.posts as any
);

router.post(
  "/admin/command",
  middlewareHandler([authentication]),
  controller.adminCommand
);

export default router;

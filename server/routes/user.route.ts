import { Router } from "express";
import UserController from "../controller/user.controller";
import authentication from "../middlewares/authentication.middleware";
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
  middlewareHandler([authentication]),
  controller.getUser as any
);

router.get(
  "/posts",
  middlewareHandler([authentication]),
  controller.posts as any
);

export default router;

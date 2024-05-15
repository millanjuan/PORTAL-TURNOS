import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validateParams } from "../middlewares/user.middlewares";
import { authParams } from "../utils/constants/validation.constants";

const router = Router();

router.post(
  "/register",
  validateParams(authParams.register),
  AuthController.createUser
);
router.post(
  "/login",
  validateParams(authParams.login),
  AuthController.validateUser
);

export default router;

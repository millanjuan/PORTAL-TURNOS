import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post("/register", AuthController.createUser);
router.post("/login", AuthController.validateUser);

export default router;

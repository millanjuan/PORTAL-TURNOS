import { Router } from "express";
import userController from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middlewares";

const router = Router();

router.get("/identity", userController.getUserByIdentity);
router.get("/profile", verifyToken, userController.getUserProfile);
router.put("/profile", verifyToken, userController.putUserProfile);

export default router;

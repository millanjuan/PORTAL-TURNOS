import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/identity", userController.getUserByIdentity);
router.get("/profile", userController.getUserProfile);
router.put("/profile", userController.putUserProfile);

export default router;

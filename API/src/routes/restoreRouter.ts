import { Router } from "express";
import RestoreController from "../controllers/restore.controller";

const router = Router();
router.post("/", RestoreController.generateCode);
router.delete("/:code", RestoreController.verifyCode);
router.put("/password", RestoreController.passwordRestore);

export default router;

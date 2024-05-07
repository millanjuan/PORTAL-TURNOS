import { Router } from "express";
import RestoreController from "../controllers/restore.controller";

const router = Router();
router
  .route("/")
  .post(RestoreController.generateCode)
  .delete(RestoreController.verifyCode);

router.put("/password", RestoreController.passwordRestore);
router.put("/username", RestoreController.usernameRestore);

export default router;

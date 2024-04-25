import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middlewares";
import ProfessionalController from "../controllers/professional.controller";

const router = Router();

router.get("/", verifyToken, ProfessionalController.getProfessionals);
router.post(
  "/new",
  verifyToken,
  verifyAdmin,
  ProfessionalController.newProfessional
);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  ProfessionalController.updateProfessional
);
router.delete(
  "/delete/:id",
  verifyToken,
  verifyAdmin,
  ProfessionalController.deleteProfessional
);

export default router;

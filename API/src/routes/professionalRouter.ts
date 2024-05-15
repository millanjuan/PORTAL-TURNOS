import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middlewares";
import ProfessionalController from "../controllers/professional.controller";
import { validateParams } from "../middlewares/user.middlewares";
import { professionalParams } from "../utils/constants/validation.constants";

const router = Router();

router.get("/", verifyToken, ProfessionalController.getProfessionals);
router.get(
  "/speciality/:id",
  verifyToken,
  ProfessionalController.getProfessionalsBySpeciality
);
router.post(
  "/new",
  verifyToken,
  verifyAdmin,
  validateParams(professionalParams.create),
  ProfessionalController.newProfessional
);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  validateParams(professionalParams.update),
  ProfessionalController.updateProfessional
);
router.delete(
  "/delete/:id",
  verifyToken,
  verifyAdmin,
  validateParams(professionalParams.delete),
  ProfessionalController.deleteProfessional
);

export default router;

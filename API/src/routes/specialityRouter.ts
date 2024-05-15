import { Router } from "express";
import SpecialityController from "../controllers/speciality.controller";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middlewares";
import { validateParams } from "../middlewares/user.middlewares";
import { specialityParams } from "../utils/constants/validation.constants";

const router = Router();

router.get("/", verifyToken, SpecialityController.getAllSpecialities);
router.post(
  "/new",
  verifyToken,
  verifyAdmin,
  validateParams(specialityParams.create),
  SpecialityController.newSpeciality
);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  validateParams(specialityParams.update),
  SpecialityController.updateSpeciality
);
router.delete(
  "/delete/:id",
  verifyToken,
  verifyAdmin,
  validateParams(specialityParams.delete),
  SpecialityController.deleteSpeciality
);

export default router;

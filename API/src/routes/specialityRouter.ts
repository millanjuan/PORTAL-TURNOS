import { Router } from "express";
import SpecialityController from "../controllers/speciality.controller";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middlewares";

const router = Router();

router.get("/", verifyToken, SpecialityController.getAllSpecialities);
router.post(
  "/new",
  verifyToken,
  verifyAdmin,
  SpecialityController.newSpeciality
);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  SpecialityController.updateSpeciality
);
router.delete(
  "/delete/:id",
  verifyToken,
  verifyAdmin,
  SpecialityController.deleteSpeciality
);

export default router;

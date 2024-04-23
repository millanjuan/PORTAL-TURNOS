import { Router } from "express";
import ProfessionalController from "../controllers/professional.controller";

const router = Router();

router.get("/", ProfessionalController.getProfessionals);
router.post("/new", ProfessionalController.newProfessional);
router.put("/:id", ProfessionalController.updateProfessional);
router.delete("/delete/:id", ProfessionalController.deleteProfessional);

export default router;

import { Router } from "express";
import SpecialityController from "../controllers/speciality.controller";

const router = Router();

router.get("/", SpecialityController.getAllSpecialities);
router.post("/new", SpecialityController.newSpeciality);
router.put("/:id", SpecialityController.updateSpeciality);
router.delete("/delete/:id", SpecialityController.deleteSpeciality);

export default router;

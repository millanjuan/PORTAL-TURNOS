import { Router } from "express";
import AppointmentController from "../controllers/appointment.controller";

const router = Router();

router.post("/", AppointmentController.createMonthlyAppointments);
router.get("/month", AppointmentController.getAppointmentsByMonth);
router.get("/date", AppointmentController.getAppointmentsByDate);
router.put("/schuddle", AppointmentController.schuddleAppointment);
router.put("/cancel", AppointmentController.cancelAppointment);
export default router;

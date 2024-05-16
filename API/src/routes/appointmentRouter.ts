import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middlewares";
import AppointmentController from "../controllers/appointment.controller";
import { validateParams } from "../middlewares/user.middlewares";
import { appointmentParams } from "../utils/constants/validation.constants";

const router = Router();

router
  .route("/")
  .post(
    verifyToken,
    verifyAdmin,
    validateParams(appointmentParams.appointment),
    AppointmentController.createMonthlyAppointments
  )
  .get(verifyToken, AppointmentController.getUserAppointments);
router.get("/month", verifyToken, AppointmentController.getAppointmentsByMonth);
router.get("/date", verifyToken, AppointmentController.getAppointmentsByDate);
router.put(
  "/schuddle",
  verifyToken,
  validateParams(appointmentParams.schuddleOrCancel),
  AppointmentController.schuddleAppointment
);
router.put(
  "/cancel",
  verifyToken,
  validateParams(appointmentParams.schuddleOrCancel),
  AppointmentController.cancelAppointment
);
export default router;

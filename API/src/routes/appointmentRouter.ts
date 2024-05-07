import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middlewares";
import AppointmentController from "../controllers/appointment.controller";
import { validateParams } from "../middlewares/user.middlewares";
import { appointmentParams } from "../utils/variables/validation.variables";

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
router.get(
  "/month",
  verifyToken,
  verifyAdmin,
  validateParams(appointmentParams.appointment),
  AppointmentController.getAppointmentsByMonth
);
router.get(
  "/date",
  verifyToken,
  validateParams(appointmentParams.date),
  AppointmentController.getAppointmentsByDate
);
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

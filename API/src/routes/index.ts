import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import professionalRouter from "./professionalRouter";
import specialityRouter from "./specialityRouter";
import appointmentRouter from "./appointmentRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/professional", professionalRouter);
router.use("/speciality", specialityRouter);
router.use("/appointment", appointmentRouter);

export default router;

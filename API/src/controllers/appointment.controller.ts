import { Request, Response } from "express";
import AppointmentService from "../services/appointment.service";
import { IMonthlyAppointments } from "../utils/interfaces/appointment.interface";
import { CustomError } from "../utils/classes/classes";
import { appointmentErrors } from "../utils/errors/errorsTypes/errors.appointment";
import { AuthenticatedRequest } from "../utils/interfaces/user.interface";
import appointmentService from "../services/appointment.service";
import { userErrors } from "../utils/errors/errorsTypes/errors.user";

class AppointmentController {
  async createMonthlyAppointments(req: Request, res: Response) {
    try {
      const { month, year, professionalId } = req.body as IMonthlyAppointments;
      const appointments = await AppointmentService.createMonthlyAppointments({
        month,
        year,
        professionalId,
      });
      res.status(201).json({ success: !!appointments, count: appointments });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error(appointmentErrors.CREATING_ERROR, error.message);
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }

  async getAppointmentsByMonth(req: Request, res: Response) {
    try {
      const { year, month, professionalId } = req.body;
      const appointments = await AppointmentService.getAppointmentsByMonth(
        year,
        month,
        professionalId
      );
      return res
        .status(200)
        .json({ success: true, appointments: appointments });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }

  async getAppointmentsByDate(req: Request, res: Response) {
    try {
      const { date, professional } = req.body;
      const appointments = await AppointmentService.getAppointmentsByDate(
        date,
        professional
      );
      return res
        .status(200)
        .json({ success: true, appointments: appointments });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }

  async schuddleAppointment(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { appointmentId } = req.body;
      const schuddledAppointment = await AppointmentService.schuddleAppointment(
        { userId, appointmentId }
      );

      return res
        .status(200)
        .json({ success: true, schuddledAppointment: schuddledAppointment });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }

  async cancelAppointment(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { appointmentId } = req.body;

      await AppointmentService.cancelAppointment({
        userId,
        appointmentId,
      });
      res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }

  async getUserAppointments(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new CustomError(userErrors.ID_ERROR, 400);
      }
      const appointments = await appointmentService.getUserAppointments(userId);
      res.status(200).json({ success: true, appointments: appointments });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error });
      }
    }
  }
}

export default new AppointmentController();

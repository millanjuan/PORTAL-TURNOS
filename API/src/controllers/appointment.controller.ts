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
      const { year, month, professionalId } = req.query;
      const parsedYear =
        typeof year === "string"
          ? parseInt(year, 10)
          : (year as unknown as number);
      const parsedMonth =
        typeof month === "string"
          ? parseInt(month, 10)
          : (month as unknown as number);

      if (isNaN(parsedYear) || isNaN(parsedMonth)) {
        throw new CustomError("Invalid year or month", 400);
      }

      const appointments = await AppointmentService.getAppointmentsByMonth(
        parsedYear,
        parsedMonth,
        professionalId as string
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
        res.status(500).json({ success: false, error: error });
      }
    }
  }

  async getAppointmentsByDate(req: Request, res: Response) {
    try {
      const { date, professionalId } = req.query;
      if (!date || !professionalId) {
        throw new CustomError(appointmentErrors.MISSING_FIELDS, 400);
      }

      const formattedDate = new Date(date.toString());
      const appointments = await AppointmentService.getAppointmentsByDate(
        formattedDate,
        professionalId.toString()
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
      const userId = req.user?._id;
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
      const userId = req.user?._id;
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
      const userId = req.user?._id;
      if (!userId) {
        throw new CustomError(userErrors.ID_ERROR, 400);
      }
      const { activeAppointments, inactiveAppointments } =
        await appointmentService.getUserAppointments(userId);
      res.status(200).json({
        success: true,
        appointments: { activeAppointments, inactiveAppointments },
      });
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

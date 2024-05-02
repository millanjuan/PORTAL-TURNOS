import { Request, Response } from "express";
import AppointmentService from "../services/appointment.service";
import { IMonthlyAppointments } from "../utils/interfaces/appointment.interface";
import { CustomError } from "../utils/classes/classes";
import { appointmentErrors } from "../utils/errors/errorsTypes/errors.appointment";
class AppointmentController {
  async createMonthlyAppointments(req: Request, res: Response) {
    try {
      const { month, year, professionalId } = req.body as IMonthlyAppointments;
      const appointments = await AppointmentService.createMonthlyAppointments({
        month,
        year,
        professionalId,
      });
      if (!appointments) {
        res.status(201).json({ success: false, appointments: appointments });
      } else {
        res.status(201).json({ success: true, appointments: appointments });
      }
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
      const { year, month, professional } = req.body;
      const appointments = await AppointmentService.getAppointmentsByMonth(
        year,
        month,
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

  async schuddleAppointment(req: Request, res: Response) {
    try {
      const { userId, appointmentId } = req.body;
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

  async cancelAppointment(req: Request, res: Response) {
    try {
      const { userId, appointmentId } = req.body;

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
}

export default new AppointmentController();

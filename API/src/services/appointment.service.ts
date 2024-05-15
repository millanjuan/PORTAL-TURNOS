import {
  IMonthlyAppointments,
  ISchuddleAppointment,
  IUserAppointments,
} from "../utils/interfaces/appointment.interface";
import { Appointment, IAppointment } from "../models/appointment.model";
import { CustomError } from "../utils/classes/classes";
import { appointmentErrors } from "../utils/errors/errorsTypes/errors.appointment";
import { startOfDay, endOfDay, endOfMonth } from "date-fns";
import {
  START_HOUR,
  END_HOUR,
  START_MINUTES,
  END_MINUTES,
  WEEKDAYS,
} from "../utils/constants/appointment.constants";

class AppointmentService {
  async createMonthlyAppointments({
    month,
    year,
    professionalId,
  }: IMonthlyAppointments): Promise<number | null> {
    try {
      const existingAppointments = await Appointment.findOne({
        month,
        year,
        professional: professionalId,
      });
      if (!existingAppointments) {
        const startDate = new Date(year, month);
        const endDate = endOfMonth(startDate);
        const appointments = [];
        //todo Recursividad
        for (let day = startDate.getDate(); day <= endDate.getDate(); day++) {
          const currentDate = new Date(year, month, day);
          const dayOfWeek = currentDate.getDay();
          if (WEEKDAYS.includes(dayOfWeek)) {
            let currentStartTime = new Date(
              year,
              month,
              day,
              START_HOUR,
              START_MINUTES
            );
            const endTime = new Date(year, month, day, END_HOUR, END_MINUTES);
            while (
              currentStartTime < endTime &&
              currentStartTime.getHours() < END_HOUR
            ) {
              appointments.push({
                date: currentDate,
                year,
                month,
                startTime: new Date(currentStartTime),
                endTime: new Date(currentStartTime.getTime() + 30 * 60000),
                active: false,
                professional: professionalId,
              });
              currentStartTime.setMinutes(currentStartTime.getMinutes() + 30);
            }
          }
        }
        const result = await Appointment.insertMany(appointments);
        return result.length;
      }
      console.log("nop");
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getAppointmentsByMonth(
    year: number,
    month: number,
    professionalId: string
  ): Promise<any[]> {
    try {
      const appointments = await Appointment.find({
        year,
        month,
        active: false,
        professional: professionalId,
      });

      if (!appointments) {
        throw new CustomError(appointmentErrors.NOT_FOUND, 404);
      }

      return appointments;
    } catch (error) {
      throw error;
    }
  }

  async getAppointmentsByDate(
    date: Date,
    professionalId: string
  ): Promise<any[]> {
    try {
      const startDate = startOfDay(date);
      const endDate = endOfDay(date);

      const appointments = await Appointment.find({
        date: { $gte: startDate, $lte: endDate },
        professional: professionalId,
        active: false,
      });

      if (appointments && appointments.length > 0) {
        const formattedAppointments = appointments.map((appointment) => ({
          _id: appointment._id,
          date: appointment.date,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          active: appointment.active,
          user: appointment.user,
          professional: appointment.professional,
          id: appointment.id,
          __v: appointment.__v,
        }));
        return formattedAppointments;
      } else {
        throw new CustomError(appointmentErrors.NOT_FOUND, 404);
      }
    } catch (error) {
      throw error;
    }
  }

  async schuddleAppointment({
    userId,
    appointmentId,
  }: ISchuddleAppointment): Promise<void> {
    try {
      const schuddle = await Appointment.findById(appointmentId);
      if (schuddle) {
        schuddle.user = userId;
        schuddle.active = true;
        await schuddle.save();
      } else {
        throw new CustomError(appointmentErrors.NOT_FOUND, 404);
      }
    } catch (error) {
      throw error;
    }
  }
  async cancelAppointment({
    userId,
    appointmentId,
  }: ISchuddleAppointment): Promise<void> {
    try {
      const appointment = await Appointment.findOne({
        _id: appointmentId,
        user: userId,
      });
      if (appointment) {
        appointment.user = null;
        appointment.active = false;
        await appointment.save();
      } else {
        throw new CustomError(appointmentErrors.NOT_FOUND, 404);
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserAppointments(userId: string): Promise<IUserAppointments> {
    try {
      const currentDate = new Date();
      const activeAppointments = await Appointment.find({
        user: userId,
        active: true,
        date: { $gte: startOfDay(currentDate) },
      })
        .populate({
          path: "professional",
          model: "Professional",
          populate: {
            path: "speciality",
            model: "Speciality",
          },
        })
        .exec();

      const inactiveAppointments = await Appointment.find({
        user: userId,
        active: false,
        date: { $lt: startOfDay(currentDate) },
      })
        .populate({
          path: "professional",
          model: "Professional",
          populate: {
            path: "speciality",
            model: "Speciality",
          },
        })
        .exec();

      if (!activeAppointments || !inactiveAppointments) {
        throw new CustomError(appointmentErrors.NOT_FOUND, 404);
      }

      return { activeAppointments, inactiveAppointments } as IUserAppointments;
    } catch (error) {
      throw error;
    }
  }
}

export default new AppointmentService();

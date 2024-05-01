import {
  IMonthlyAppointments,
  ISchuddleAppointment,
} from "../utils/interfaces/appointment.interface";
import { Appointment, IAppointment } from "../models/appointment.model";
import CustomError from "../utils/errors/CustomError";
import { appointmentErrors } from "../utils/errors/errorsTypes/errors.appointment";
import {
  format,
  addDays,
  addMinutes,
  getDay,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { toUtc } from "../utils/functions/functions";

const timeZone = "America/Argentina/Buenos_aires";

class AppointmentService {
  async createMonthlyAppointments({
    month,
    year,
    professionalId,
  }: IMonthlyAppointments): Promise<Number> {
    try {
      const currentDate = toZonedTime(toUtc(new Date()), timeZone);
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);

      const isSameMonth =
        currentDate.getMonth() === month && currentDate.getFullYear() === year;
      // TODO Fixear casos donde el usuario intenta crear turnos el ultimo dia del mes, deberia devolver un error
      let iterableDate =
        isSameMonth && currentDate.getDate() < endDate.getDate()
          ? addDays(currentDate, 1)
          : startDate;

      const tasks = [];
      let totalAppointments = 0;
      //TODO Corregir algunos formatos de fechas y verificar error de generacion a las 6 de la mañana
      //!! BUSCAR OTRA MANERA(ojala)
      while (iterableDate <= endDate) {
        if (getDay(iterableDate) >= 1 && getDay(iterableDate) <= 5) {
          for (let hour = 8; hour < 16; hour++) {
            for (let minutes = 0; minutes < 60; minutes += 30) {
              const utcDate = new Date(
                Date.UTC(
                  iterableDate.getFullYear(),
                  iterableDate.getMonth(),
                  iterableDate.getDate(),
                  hour,
                  minutes
                )
              );

              const argentinaDate = toZonedTime(utcDate, timeZone);
              const formattedDate = format(argentinaDate, "yyyy-MM-dd");
              const formattedTime = format(argentinaDate, "HH:mm:ss");
              const start = new Date(`${formattedDate}T${formattedTime}`);
              const end = addMinutes(start, 30);

              const task = Appointment.findOne({
                date: start,
                startTime: start,
                professional: professionalId,
              }).then((existingAppointment) => {
                if (!existingAppointment) {
                  const newAppointment: IAppointment = new Appointment({
                    date: start,
                    startTime: start,
                    endTime: end,
                    active: false,
                    professional: professionalId,
                  });
                  totalAppointments++;
                  return newAppointment.save();
                } else {
                  return null;
                }
              });

              tasks.push(task);
            }
          }
        }

        iterableDate = addDays(iterableDate, 1);
      }

      await Promise.all(tasks);
      return totalAppointments;
    } catch (error) {
      console.error(appointmentErrors.CREATING_ERROR, error);
      throw new CustomError(appointmentErrors.CREATING_ERROR, 500);
    }
  }

  async getAppointmentsByMonth(
    year: number,
    month: number,
    professional: string
  ): Promise<any[]> {
    try {
      const startDate = startOfMonth(new Date(year, month));
      const endDate = endOfMonth(new Date(year, month));

      const appointments = await Appointment.find({
        date: { $gte: startDate, $lte: endDate },
        active: false,
        professional,
      });
      const activeDates = appointments.map((appointment) => appointment.date);

      return activeDates;
    } catch (error) {
      console.error(appointmentErrors.FETCHING_ERROR, error);
      throw new CustomError(appointmentErrors.FETCHING_ERROR, 500);
    }
  }

  async getAppointmentsByDate(
    date: Date,
    professional: string
  ): Promise<any[]> {
    try {
      const startDate = startOfDay(date);
      const endDate = endOfDay(date);

      const appointments = await Appointment.find({
        date: { $gte: startDate, $lte: endDate },
        professional,
      });

      if (appointments && appointments.length > 0) {
        const formattedAppointments = appointments.map((appointment) => ({
          _id: appointment._id,
          date: format(appointment.date, "yyyy-MM-dd"),
          startTime: format(appointment.startTime, "HH:mm:ss"),
          endTime: format(appointment.endTime, "HH:mm:ss"),
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
      if (error instanceof CustomError) {
        throw error;
      } else {
        console.error(appointmentErrors.FETCHING_ERROR, error);
        throw new CustomError(appointmentErrors.FETCHING_ERROR, 500);
      }
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
      if (error instanceof CustomError) {
        throw error;
      } else {
        console.error(appointmentErrors.SCHUDDLE_ERROR, error);
        throw new CustomError(appointmentErrors.SCHUDDLE_ERROR, 500);
      }
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
      if (error instanceof CustomError) {
        throw error;
      } else {
        console.error(appointmentErrors.CANCEL_ERROR, error);
        throw new CustomError(appointmentErrors.CANCEL_ERROR, 500);
      }
    }
  }
}

export default new AppointmentService();

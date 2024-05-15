import { IAppointment } from "../../models/appointment.model";
import { ISpeciality } from "../../models/speciality.model";
import { IProfessional } from "../../models/professional.model";
export interface IMonthlyAppointments {
  month: number;
  year: number;
  professionalId: string;
}

export interface ISchuddleAppointment {
  userId?: string;
  appointmentId: string;
}

export interface IUserAppointments {
  activeAppointments: (IAppointment & {
    professional: IProfessional;
    speciality: ISpeciality;
  })[];
  inactiveAppointments: (IAppointment & {
    professional: IProfessional;
    speciality: ISpeciality;
  })[];
}

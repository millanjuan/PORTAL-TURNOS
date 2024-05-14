import { IAppointmentState } from "../../utils/interfaces/appointmentInterface";
import { IAuthState } from "../../utils/interfaces/authInterface";
import { IProfessionalState } from "../../utils/interfaces/professionalInterface";
import { ISpecialityState } from "../../utils/interfaces/specialityInterface";
import { IUserState } from "../../utils/interfaces/userInterface";

export const authInitialState: IAuthState = {
  loading: false,
  userData: null,
};

export const userInitialState: IUserState = {
  loading: false,
};

export const appointmentInitialState: IAppointmentState = {
  loading: false,
  monthAppointments: {},
  dateAppointments: {},
  userAppointments: {},
  appointmentState: "speciality",
};

export const specialitiesInitialState: ISpecialityState = {
  loading: false,
  specialities: <any>[],
};

export const professionalInitialState: IProfessionalState = {
  loading: false,
  professionals: <any>[],
  total: null,
};

import { IAuthState } from "../../utils/interfaces/authInterface";

export const authInitialState: IAuthState = {
  loading: false,
  userData: null,
};

export const userInitialState = {
  loading: false,
};

export const appointmentInitialState = {
  loading: false,
  monthAppointments: {},
  dateAppointments: {},
  userAppointments: {},
  appointmentState: "speciality",
};

export const specialitiesInitialState = {
  loading: false,
  specialities: [],
};

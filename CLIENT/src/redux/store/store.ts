import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import appointmentReducer from "../slices/appointmentSlice";
import specialitiesReducer from "../slices/specialitySlice";
import professionalReducer from "../slices/professionalSlice";
import restoreReducer from "../slices/restoreSlice";
import { IAuthState } from "../../utils/interfaces/authInterface";
import { IAppointmentState } from "../../utils/interfaces/appointmentInterface";
import { ISpecialityState } from "../../utils/interfaces/specialityInterface";
import {
  IProfessionalState,
  IRestoreState,
} from "../../utils/interfaces/professionalInterface";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointment: appointmentReducer,
    speciality: specialitiesReducer,
    professional: professionalReducer,
    restore: restoreReducer,
  },
});

export type RootState = {
  auth: IAuthState;
  appointment: IAppointmentState;
  speciality: ISpecialityState;
  professional: IProfessionalState;
  restore: IRestoreState;
};

export type AppDispatch = typeof store.dispatch;

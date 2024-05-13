import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import appointmentReducer from "../slices/appointmentSlice";
import { IAuthState } from "../../utils/interfaces/authInterface";
import { IAppointmentState } from "../../utils/interfaces/appointmentInterface";

export const store = configureStore({
  reducer: { auth: authReducer, appointment: appointmentReducer },
});

export type RootState = {
  auth: IAuthState;
  appointment: IAppointmentState;
};

export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appointmentInitialState } from "../initialStates/states";
import { IAppointmentState } from "../../utils/interfaces/appointmentInterface";
import {
  schuddleAsync,
  cancelAsync,
  getAppointmentsAsync,
  getAppointmentsByDateAsync,
  getAppointmentsByMonthAsync,
  postMonthlyAppointmentsAsync,
} from "../thunks/appointmentThunk";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: appointmentInitialState,
  reducers: {
    setApointmentState: (state, action) => {
      state.appointmentState = action.payload;
    },
  },
  extraReducers: (builder) => {
    const setUserAppointments = (
      state: IAppointmentState,
      action: PayloadAction<{ appointments: any[] }>
    ) => {
      state.userAppointments = action.payload.appointments;
      state.loading = false;
    };

    const setDateAppointments = (
      state: IAppointmentState,
      action: PayloadAction<{ appointments: any[] }>
    ) => {
      state.dateAppointments = action.payload.appointments;
      state.loading = false;
    };

    const setMonthAppointments = (
      state: IAppointmentState,
      action: PayloadAction<{ appointments: any[] }>
    ) => {
      state.monthAppointments = action.payload.appointments;
      state.loading = false;
    };

    builder
      .addMatcher(
        (action) =>
          [
            schuddleAsync.pending,
            cancelAsync.pending,
            getAppointmentsAsync.pending,
            getAppointmentsByDateAsync.pending,
            getAppointmentsByMonthAsync.pending,
            postMonthlyAppointmentsAsync.pending,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => getAppointmentsAsync.fulfilled === action.type,
        setUserAppointments
      )
      .addMatcher(
        (action) => getAppointmentsByDateAsync.fulfilled === action.type,
        setDateAppointments
      )
      .addMatcher(
        (action) => getAppointmentsByMonthAsync.fulfilled === action.type,
        setMonthAppointments
      )
      .addMatcher(
        (action) =>
          [
            schuddleAsync.fulfilled,
            cancelAsync.fulfilled,
            postMonthlyAppointmentsAsync.fulfilled,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            schuddleAsync.rejected,
            cancelAsync.rejected,
            getAppointmentsAsync.rejected,
            getAppointmentsByDateAsync.rejected,
            getAppointmentsByMonthAsync.rejected,
            postMonthlyAppointmentsAsync.rejected,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      );
  },
});
export const { setApointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { appointmentInitialState } from "../initialStates/states";
import {
  getAppointmentsByDateAsync,
  getAppointmentsByMonthAsync,
  schuddleAsync,
} from "../thunks/appointmentThunk";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: appointmentInitialState,
  reducers: {
    setApointmentState: (state, action) => {
      state.appointmentState = action.payload;
    },
    setCurrentProfessional: (state, action) => {
      state.currentProfessional = action.payload;
    },
    setChosenAppointment: (state, action) => {
      state.chosenAppointment = action.payload;
    },
    clearSchuddle: (state) => {
      state.chosenAppointment = "";
      state.currentProfessional = "";
      state.appointmentState = "speciality";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointmentsByMonthAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointmentsByMonthAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.monthAppointments = action.payload.appointments;
      })
      .addCase(getAppointmentsByMonthAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAppointmentsByDateAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointmentsByDateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.dateAppointments = action.payload.appointments;
      })
      .addCase(getAppointmentsByDateAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(schuddleAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(schuddleAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(schuddleAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const {
  setApointmentState,
  setCurrentProfessional,
  clearSchuddle,
  setChosenAppointment,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;

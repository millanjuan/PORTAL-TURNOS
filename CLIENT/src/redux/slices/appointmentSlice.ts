import { createSlice } from "@reduxjs/toolkit";
import { appointmentInitialState } from "../initialStates/states";
import {
  cancelAsync,
  getAppointmentsByDateAsync,
  getAppointmentsByMonthAsync,
  getUserAppointmentsAsync,
  schuddleAsync,
} from "../thunks/appointmentThunk";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: appointmentInitialState,
  reducers: {
    setApointmentState: (state, action) => {
      state.appointmentState = action.payload;
    },
    setCurrentSpeciality: (state, action) => {
      state.currentSpeciality = action.payload;
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
      })
      .addCase(getUserAppointmentsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAppointmentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userActiveAppointments =
          action.payload.appointments.activeAppointments;
        state.userInactiveAppointments =
          action.payload.appointments.inactiveAppointments;
      })
      .addCase(getUserAppointmentsAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(cancelAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cancelAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const {
  setApointmentState,
  setCurrentProfessional,
  clearSchuddle,
  setChosenAppointment,
  setCurrentSpeciality,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;

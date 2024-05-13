import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import {
  IAppointment,
  IDateAppointments,
  IMonthAppointments,
} from "../../utils/interfaces/appointmentInterface";

export const schuddleAsync = createAsyncThunk(
  "appointment/schuddleAsync",
  async ({ appointmentId, token }: IAppointment, { rejectWithValue }) => {
    try {
      const config = {
        params: {
          appointmentId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_URL_BACK}/appointment/schuddle`,
        config
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelAsync = createAsyncThunk(
  "appointment/cancelAsync",
  async ({ appointmentId, token }: IAppointment, { rejectWithValue }) => {
    try {
      const config = {
        params: {
          appointmentId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_URL_BACK}/appointment/cancel`,
        config
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAppointmentsAsync = createAsyncThunk(
  "appointment/getAppointmentsAsync",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_BACK}/appointment/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAppointmentsByMonthAsync = createAsyncThunk(
  "appointment/getAppointmentsByMonthAsync",
  async (
    { year, month, professionalId, token }: IMonthAppointments,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        params: {
          year,
          month,
          professionalId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_BACK}/appointment/month`,
        config
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAppointmentsByDateAsync = createAsyncThunk(
  "appointment/getAppointmentsByDateAsync",
  async (
    { date, professionalId, token }: IDateAppointments,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        params: {
          date,
          professionalId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_BACK}/appointment/date`,
        config
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postMonthlyAppointmentsAsync = createAsyncThunk(
  "appointment/postMonthlyAppointmentsAsync",
  async (
    { month, year, professionalId, token }: IMonthAppointments,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        params: {
          month,
          year,
          professionalId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/appointment/`,
        config
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

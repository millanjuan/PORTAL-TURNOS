import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backUrl = import.meta.env.VITE_URL_BACK;

export const generateCodeAsync = createAsyncThunk(
  "restore/generateCodeAsync",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backUrl}/restore/`, {
        email,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyCodeAsync = createAsyncThunk(
  "restore/verifyCodeAsync",
  async (code: string, { rejectWithValue }) => {
    try {
      console.log(code);
      const { data } = await axios.delete(`${backUrl}/restore/${code}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const restorePasswordAsync = createAsyncThunk(
  "restore/restorePasswordAsync",
  async (
    { password, id }: { password: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(`${backUrl}/restore/password`, {
        password,
        id,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

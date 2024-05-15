import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProfessional } from "../../utils/interfaces/professionalInterface";
import { viteBackUrl } from "../../utils/constants/constants";

export const getProfessionalsAsync = createAsyncThunk(
  "professional/getProfessionalsAsync",
  async (filters: IProfessional, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${viteBackUrl}/professional/`, config);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProfessionalsBySpecialityAsync = createAsyncThunk(
  "professional/getProfessionalsBySpecialityAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${viteBackUrl}/professional/speciality/${id}`,
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

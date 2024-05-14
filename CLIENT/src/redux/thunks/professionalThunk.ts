import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProfessional } from "../../utils/interfaces/professionalInterface";
import { viteBackUrl } from "../../utils/constants/constants";

const token = localStorage.getItem("token");

export const getProfessionalsAsync = createAsyncThunk(
  "professional/getProfessionalsAsync",
  async (filters: IProfessional, { rejectWithValue }) => {
    try {
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

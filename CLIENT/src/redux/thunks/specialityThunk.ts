import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IDeleteSpeciality,
  INewSpeciality,
  IUpdateSpeciality,
} from "../../utils/interfaces/specialityInterface";
import { viteBackUrl } from "../../utils/constants/constants";

export const getSpecialitiesAsync = createAsyncThunk(
  "speciality/getSpecialitiesAsync",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${viteBackUrl}/speciality/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const newSpecialityAsync = createAsyncThunk(
  "speciality/newSpecialityAsync",
  async (
    { name, image, professionals, token }: INewSpeciality,
    { rejectWithValue }
  ) => {
    const config = {
      params: {
        name,
        image,
        professionals,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${viteBackUrl}/speciality/new`,
        config
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSpeciality = createAsyncThunk(
  "speciality/newSpecialityAsync",
  async (
    {
      specialityId,
      data,
      token,
    }: {
      specialityId: string;
      data: IUpdateSpeciality;
      token: string;
    },
    { rejectWithValue }
  ) => {
    const config = {
      params: {
        data,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${viteBackUrl}/speciality/${specialityId}`,
        config
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSpecialityAsync = createAsyncThunk(
  "speciality/delete",
  async ({ specialityId, token }: IDeleteSpeciality, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${viteBackUrl}/speciality/${specialityId}`,
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

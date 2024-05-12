import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ISignIn, ISignUp } from "../../utils/interfaces/authInterface";

export const signUpAsync = createAsyncThunk(
  "auth/signUpAsync",
  async (userData: ISignUp, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/auth/register`,
        userData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signInAsync = createAsyncThunk(
  "auth/signInAsync",
  async (signInData: ISignIn, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/auth/login`,
        signInData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forcedSignInAsync = createAsyncThunk(
  "auth/forcedSignInAsync",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_BACK}/users/profile`,
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

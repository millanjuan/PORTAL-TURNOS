import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ISignIn, ISignUp } from "../../utils/interfaces/authInterface";
import { IUpdate } from "../../utils/interfaces/userInterface";

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
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
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
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUserAsync",
  async (updateUserInfo: IUpdate, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${import.meta.env.VITE_URL_BACK}/users/profile`,
        updateUserInfo,
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

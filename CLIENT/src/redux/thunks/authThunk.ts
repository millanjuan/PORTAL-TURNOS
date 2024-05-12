import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ISignIn, ISignUp } from "../../utils/interfaces/interfaces";
import { register } from "../api/authApi";

export const signUpAsync = createAsyncThunk(
  "auth/signUpAsync",
  async (userData: ISignUp) => {
    const response = await register(userData);
    return response;
  }
);

export const signInAsync = createAsyncThunk(
  "auth/signInAsync",
  async (signInData: ISignIn) => {
    const { username, password } = signInData;
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL_BACK}/auth/login`,
      {
        username,
        password,
      }
    );
    return data;
  }
);

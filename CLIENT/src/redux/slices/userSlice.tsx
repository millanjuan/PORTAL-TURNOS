import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "../initialStates/states";

const userSlice = createSlice({
  name: "user",
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {},
});

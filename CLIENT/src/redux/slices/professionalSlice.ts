import { createSlice } from "@reduxjs/toolkit";
import { professionalInitialState } from "../initialStates/states";
import {
  getProfessionalsAsync,
  getProfessionalsBySpecialityAsync,
} from "../thunks/professionalThunk";

const professionalSlice = createSlice({
  name: "professional",
  initialState: professionalInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfessionalsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfessionalsAsync.fulfilled, (state, action) => {
        state.total = action.payload.professionals.total;
        state.professionals = action.payload.professionals.professionals;
        state.loading = false;
      })
      .addCase(getProfessionalsAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProfessionalsBySpecialityAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfessionalsBySpecialityAsync.fulfilled, (state, action) => {
        state.professionals = action.payload.professionals;
        state.loading = false;
      })
      .addCase(getProfessionalsBySpecialityAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default professionalSlice.reducer;

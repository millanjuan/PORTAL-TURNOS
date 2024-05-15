import { createSlice } from "@reduxjs/toolkit";
import { specialitiesInitialState } from "../initialStates/states";
import {
  getSpecialitiesAsync,
  updateSpeciality,
  newSpecialityAsync,
  deleteSpecialityAsync,
} from "../thunks/specialityThunk";

const specialitySlice = createSlice({
  name: "speciality",
  initialState: specialitiesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpecialitiesAsync.fulfilled, (state, action) => {
        state.specialities = action.payload.specialities;
        state.loading = false;
      })
      .addCase(getSpecialitiesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSpecialitiesAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default specialitySlice.reducer;

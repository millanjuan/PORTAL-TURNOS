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
      .addMatcher(
        (action) =>
          [
            getSpecialitiesAsync.pending,
            updateSpeciality.pending,
            newSpecialityAsync.pending,
            deleteSpecialityAsync.pending,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            updateSpeciality.fulfilled,
            newSpecialityAsync.fulfilled,
            deleteSpecialityAsync.fulfilled,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            getSpecialitiesAsync.rejected,
            updateSpeciality.rejected,
            newSpecialityAsync.rejected,
            deleteSpecialityAsync.rejected,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default specialitySlice.reducer;

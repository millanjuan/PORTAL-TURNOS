import { createSlice } from "@reduxjs/toolkit";
import { restoreInitialState } from "../initialStates/states";
import {
  generateCodeAsync,
  restorePasswordAsync,
  verifyCodeAsync,
} from "../thunks/restoreThunk";

const restoreSlice = createSlice({
  name: "restore",
  initialState: restoreInitialState,
  reducers: {
    setState: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateCodeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateCodeAsync.fulfilled, (state) => {
        state.loading = false;
        state.status = "verification";
      })
      .addCase(generateCodeAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyCodeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyCodeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.status = "restore";
      })
      .addCase(verifyCodeAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(restorePasswordAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(restorePasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.status = "email";
      })
      .addCase(restorePasswordAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setState } = restoreSlice.actions;

export default restoreSlice.reducer;

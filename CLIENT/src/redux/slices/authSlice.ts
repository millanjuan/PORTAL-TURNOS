import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "../initialStates/states";
import {
  signUpAsync,
  signInAsync,
  forcedSignInAsync,
  updateUserAsync,
} from "../thunks/authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
      })
      .addCase(signUpAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("expirationTime", action.payload.expirationTime);
      })
      .addCase(signInAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forcedSignInAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(forcedSignInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.profile;
      })
      .addCase(forcedSignInAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
      })
      .addCase(updateUserAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;

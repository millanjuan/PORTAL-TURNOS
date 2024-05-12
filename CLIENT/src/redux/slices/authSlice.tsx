import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "../initialStates/states";
import { signUpAsync, signInAsync } from "../thunks/authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logOut: (state) => {
      (state.isAuthenticated = false), localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = true),
          (state.userData = action.payload.user);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signUpAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isAuthenticated = true),
          (state.userData = action.payload.user.userData);
        localStorage.setItem("token", action.payload.user.token);
      })
      .addCase(signInAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;

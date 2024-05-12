import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { IAuthState } from "../../utils/interfaces/authInterface";

export const store = configureStore({
  reducer: { auth: authReducer },
});

export type RootState = {
  auth: IAuthState;
};

export type AppDispatch = typeof store.dispatch;

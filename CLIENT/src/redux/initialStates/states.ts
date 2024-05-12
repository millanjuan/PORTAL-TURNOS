import { IAuthState } from "../../utils/interfaces/interfaces";

export const authInitialState: IAuthState = {
  loading: false,
  isAuthenticated: false,
  userData: null,
};

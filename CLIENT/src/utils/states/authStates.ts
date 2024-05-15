import {
  ISignIn,
  ISignInErrors,
  ISignUp,
  ISignUpErrors,
  IUpdateErrors,
} from "../interfaces/authInterface";
import { IUpdate } from "../interfaces/userInterface";

export const initialRegisterState: ISignUp = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  password2: "",
  typeidentity: "DNI",
  identity: null,
};

export const initialErrorRegisterState: ISignUpErrors = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  identity: "",
};

export const initialLoginState: ISignIn = {
  username: "",
  password: "",
};

export const initialLoginErrorState: ISignInErrors = {
  username: "",
  password: "",
};

export const initialUpdateErrorState: IUpdateErrors = {
  firstname: "",
  lastname: "",
  address: "",
  cellphone: "",
  birthdate: "",
};

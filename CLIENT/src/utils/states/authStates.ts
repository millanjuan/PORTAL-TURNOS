import {
  ISignIn,
  ISignInErrors,
  ISignUp,
  ISignUpErrors,
} from "../interfaces/authInterface";

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

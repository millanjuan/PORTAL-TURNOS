import { ReactNode } from "react";
export interface LayoutProps {
  children: ReactNode;
}

export interface ISignUpErrors {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  identity: string;
  birthdate: string;
}
export interface ISignInErrors {
  email: string;
  password: string;
}

export interface IUpdateErrors {
  firstname: string;
  lastname: string;
  address: string;
  cellphone: string;
  birthdate: string;
}
export interface ISignUp {
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  password: string;
  password2: string;
  typeidentity: string;
  identity: number | null;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IAuthState {
  loading: boolean;
  userData: any;
}

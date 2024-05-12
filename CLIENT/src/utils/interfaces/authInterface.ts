import { ReactNode } from "react";
export interface LayoutProps {
  children: ReactNode;
}

export interface ISignUpErrors {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  identity: string;
}
export interface ISignInErrors {
  username: string;
  password: string;
}
export interface ISignUp {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  password2: string;
  typeidentity: string;
  identity: number | null;
}

export interface ISignIn {
  username: string;
  password: string;
}

export interface IAuthState {
  loading: boolean;
  userData: any;
}

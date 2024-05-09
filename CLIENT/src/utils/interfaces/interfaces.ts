import { ReactNode } from "react";
export interface LayoutProps {
  children: ReactNode;
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
  birthdate: string;
}

export interface ISignIn {
  username: string;
  password: string;
}

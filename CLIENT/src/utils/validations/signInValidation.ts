import { ISignIn } from "../interfaces/authInterface";

const validateSignIn = (userData: ISignIn) => {
  const { email, password } = userData;
  const loginErrors: Partial<Record<keyof ISignIn, string>> = {};
  if (!email) loginErrors.email = "Email is required.";
  if (!password) loginErrors.password = "Password is required.";
  return loginErrors;
};

export default validateSignIn;

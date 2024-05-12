import { ISignIn } from "../interfaces/authInterface";

const validateSignIn = (userData: ISignIn) => {
  const { username, password } = userData;
  const loginErrors: Partial<Record<keyof ISignIn, string>> = {};
  if (!username) loginErrors.username = "Username is required.";
  if (!password) loginErrors.password = "Password is required.";
  return loginErrors;
};

export default validateSignIn;

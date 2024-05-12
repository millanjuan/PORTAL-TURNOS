import { ISignUp } from "../interfaces/authInterface";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^.{8,20}$/;
  return passwordRegex.test(password);
};

const validateSignUp = (userData: ISignUp) => {
  const {
    firstname,
    lastname,
    email,
    username,
    password,
    password2,
    identity,
  } = userData;
  const registerErrors: Partial<Record<keyof ISignUp, string>> = {};

  if (!firstname) {
    registerErrors.firstname = "Firstname is required.";
  }
  if (!lastname) {
    registerErrors.lastname = "Lastname is required.";
  }
  if (!email) {
    registerErrors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    registerErrors.email = "Invalid email.";
  }

  if (!username) {
    registerErrors.username = "Username is required.";
  } else if (username.length < 6 || username.length > 20) {
    registerErrors.username = "Username must be between 6 and 20 characters.";
  }

  if (!password || !password2) {
    registerErrors.password = "Password is required.";
  } else if (!isValidPassword(password) || !isValidPassword(password2)) {
    registerErrors.password = "Password must be between 8 and 20 characters.";
  } else if (password !== password2) {
    registerErrors.password = "Passwords don't match.";
  }

  if (!identity) {
    registerErrors.identity = "Identity is required.";
  }

  return registerErrors;
};

export default validateSignUp;

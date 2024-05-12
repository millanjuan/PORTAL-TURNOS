import { ISignUp } from "../interfaces/interfaces";

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
  const errors: Partial<Record<keyof ISignUp, string>> = {};

  if (!firstname) {
    errors.firstname = "Firstname is required.";
  }
  if (!lastname) {
    errors.lastname = "Lastname is required.";
  }
  if (!email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Invalid email.";
  }

  if (!username) {
    errors.username = "Username is required.";
  } else if (username.length < 6 || username.length > 20) {
    errors.username = "Username must be between 6 and 20 characters.";
  }

  if (!password || !password2) {
    errors.password = "Password is required.";
  } else if (!isValidPassword(password) || !isValidPassword(password2)) {
    errors.password = "Password must be between 8 and 20 characters.";
  } else if (password !== password2) {
    errors.password = "Passwords don't match.";
  }

  if (!identity) {
    errors.identity = "Identity is required.";
  }

  return errors;
};

export default validateSignUp;

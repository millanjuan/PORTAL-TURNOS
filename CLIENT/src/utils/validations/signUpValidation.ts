import { ISignUp } from "../interfaces/authInterface";

const isValidDate = (date: string): boolean => {
  const dateRegex = /^(19[3-9]\d|200\d|2010)-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^.{8,20}$/;
  return passwordRegex.test(password);
};

const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
};

const validateSignUp = (userData: ISignUp) => {
  const {
    firstname,
    lastname,
    email,
    birthdate,
    password,
    password2,
    identity,
  } = userData;
  const registerErrors: Partial<Record<keyof ISignUp, string>> = {};

  if (!firstname) {
    registerErrors.firstname = "Firstname is required.";
  } else if (!isValidName(firstname)) {
    registerErrors.firstname = "Invalid firstname.";
  }

  if (!lastname) {
    registerErrors.lastname = "Lastname is required.";
  } else if (!isValidName(lastname)) {
    registerErrors.lastname = "Invalid lastname.";
  }

  if (!email) {
    registerErrors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    registerErrors.email = "Invalid email.";
  }

  if (!birthdate) {
    registerErrors.birthdate = "Birthdate is required.";
  } else if (!isValidDate(birthdate)) {
    registerErrors.birthdate = "Invalid birthdate.";
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

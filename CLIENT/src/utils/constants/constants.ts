export const routesWithoutHeader = ["/signin", "/signup", "/restore"];
export const signUpFields = [
  "firstname",
  "lastname",
  "email",
  "username",
  "typeidentity",
  "identity",
];

export const viteBackUrl = import.meta.env.VITE_URL_BACK;

export const genderOptions = [
  "Male",
  "Female",
  "Non binary",
  "I prefer not to say",
];

export const restoreStates = {
  EMAIL: "email",
  VERIFY: "verify",
  PASSWORD: "password",
  SUCCESS: "success",
};

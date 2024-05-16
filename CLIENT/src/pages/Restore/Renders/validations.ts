export const validateEmail = (email: string) => {
  let error = "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    error = "Email is required.";
  } else if (!emailRegex.test(email)) {
    error = "Invalid email address";
  }

  return error;
};

const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^.{8,20}$/;
  return passwordRegex.test(password);
};
export const validatePassword = (password: string, password2: string) => {
  let error;
  if (!password || !password2) {
    error = "Password is required.";
  } else if (!isValidPassword(password) || !isValidPassword(password2)) {
    error = "Password must be between 8 and 20 characters.";
  } else if (password !== password2) {
    error = "Passwords don't match.";
  }
  return error;
};

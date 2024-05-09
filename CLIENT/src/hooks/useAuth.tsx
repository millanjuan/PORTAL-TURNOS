import { useState } from "react";
import { ISignIn, ISignUp } from "../utils/interfaces/interfaces";

const useAuth = (initialState: ISignUp | ISignIn) => {
  const [user, setUser] = useState<ISignUp | ISignIn>(initialState);
  const [errors, setErrors] = useState({});
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  console.log(user);
  return [handleChange];
};

export default useAuth;

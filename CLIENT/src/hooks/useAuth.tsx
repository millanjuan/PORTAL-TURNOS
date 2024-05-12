import { useState, ChangeEvent } from "react";
import {
  ISignIn,
  ISignUp,
  ISignUpErrors,
} from "../utils/interfaces/interfaces";
import validateSignUp from "../utils/validations/signUpValidation";
import { signUpAsync } from "../redux/thunks/authThunk";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const useAuth = (initialState: ISignUp | ISignIn) => {
  const [user, setUser] = useState<ISignUp | ISignIn>(initialState);
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    identity: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validUser = useSelector((state: any) => state.auth.userData);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleRegister = () => {
    const validationError = validateSignUp(user as ISignUp);
    if (Object.keys(validationError).length === 0) {
      try {
        const response = dispatch<any>(signUpAsync(user as ISignUp));
        console.log("response", response);
        if (validUser) navigate("/home");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please try again",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.close();
          }
        });
      }
    } else {
      setErrors(validationError as ISignUpErrors);
    }
  };
  return { handleChange, handleRegister, errors };
};

export default useAuth;

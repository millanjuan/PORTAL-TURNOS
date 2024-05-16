import { ChangeEvent, useState } from "react";
import {
  ISignIn,
  ISignInErrors,
  ISignUp,
  ISignUpErrors,
} from "../utils/interfaces/authInterface";
import validateSignUp from "../utils/validations/signUpValidation";
import { signUpAsync, signInAsync } from "../redux/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { errorAlert } from "../utils/alerts/alerts";
import validateSignIn from "../utils/validations/signInValidation";
import {
  initialErrorRegisterState,
  initialLoginErrorState,
} from "../utils/states/authStates";

const useAuth = (initialState: ISignUp | ISignIn) => {
  const [user, setUser] = useState<ISignUp | ISignIn>(initialState);
  const [registerErrors, setRegisterErrors] = useState(
    initialErrorRegisterState
  );
  const [loginErrors, setLoginErrors] = useState(initialLoginErrorState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    const isRegisterForm = "firstname" in user;
    if (isRegisterForm) {
      setRegisterErrors({
        ...registerErrors,
        [name]: "",
      });
    } else {
      setLoginErrors({
        ...loginErrors,
        [name]: "",
      });
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleRegister = async () => {
    const validationError = validateSignUp(user as ISignUp);
    if (Object.keys(validationError).length === 0) {
      try {
        const { payload } = await dispatch<any>(signUpAsync(user as ISignUp));
        if (!payload.success) console.log(payload);
        localStorage.setItem("token", payload.token);
        localStorage.setItem("expirationTime", payload.expirationTime);
        navigate("/");
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      setRegisterErrors(validationError as ISignUpErrors);
    }
  };

  const handleLogin = async () => {
    const validationError = validateSignIn(user as ISignIn);
    if (Object.keys(validationError).length === 0) {
      try {
        const { payload } = await dispatch<any>(signInAsync(user as ISignIn));
        if (!payload.success) return errorAlert(payload.error);
        await Promise.all([
          localStorage.setItem("token", payload.token),
          localStorage.setItem("expirationTime", payload.expirationTime),
        ]);
        navigate("/");
      } catch (error) {
        throw error;
      }
    } else {
      setLoginErrors(validationError as ISignInErrors);
    }
  };

  return {
    handleChange,
    handleRegister,
    handleLogin,
    registerErrors,
    loginErrors,
    handleNavigate,
  };
};

export default useAuth;

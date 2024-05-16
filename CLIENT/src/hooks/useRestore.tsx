import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "../pages/Restore/Renders/validations";
import {
  generateCodeAsync,
  restorePasswordAsync,
} from "../redux/thunks/restoreThunk";
import { errorAlert } from "../utils/alerts/alerts";
import Swal from "sweetalert2";
import { setState } from "../redux/slices/restoreSlice";

const useRestore = (initialState: any | null) => {
  const [data, setData] = useState(initialState);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    if (name === "email") {
      setEmailError("");
    } else {
      setPasswordError("");
    }
  };

  const handleSendCode = async () => {
    const email = data.email;
    const validate = validateEmail(email);
    if (!validate) {
      try {
        const { payload } = await dispatch<any>(generateCodeAsync(email));
        if (!payload.success) return errorAlert(payload.error);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Code sent.",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.close();
            dispatch(setState("verify"));
          }
        });
      } catch (error) {
        throw error;
      }
    } else {
      setEmailError(validate);
    }
  };

  const handlePasswordChange = async () => {
    const validate = validatePassword(data.password, data.password2);
    if (!validate) {
      try {
        const password = data.password;
        const id = data.id;
        const { payload } = await dispatch<any>(
          restorePasswordAsync({ password, id })
        );
        if (!payload.success) return errorAlert(payload.error);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Password changed",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.close();
            navigate("/signin");
          }
        });
      } catch (error) {
        throw error;
      }
    } else {
      setPasswordError(validate);
    }
  };

  return {
    handleChange,
    handleSendCode,
    handlePasswordChange,
    passwordError,
    emailError,
  };
};

export default useRestore;

import axios from "axios";
import { ISignUp } from "../../utils/interfaces/interfaces";
import { signUpErrorAlert } from "../../utils/alerts/alerts";

export const register = async (userData: ISignUp) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL_BACK}/auth/register`,
      userData
    );
    return data;
  } catch (error: any) {
    signUpErrorAlert(error.response.data.error);
  }
};

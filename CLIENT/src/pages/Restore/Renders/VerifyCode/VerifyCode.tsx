import styles from "./verifyCode.module.sass";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyCodeAsync } from "../../../../redux/thunks/restoreThunk";
import { setState } from "../../../../redux/slices/restoreSlice";
import { errorAlert } from "../../../../utils/alerts/alerts";

const VerifyCode: React.FC = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const handleVerifyCode = async () => {
    try {
      const { payload } = await dispatch<any>(verifyCodeAsync(code));
      if (!payload.success) {
        errorAlert(payload.error);
      } else {
        dispatch(setState("password"));
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.verifyForm}>
        <h2 className={styles.title}>Enter code</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="code"
            placeholder="Enter code"
            className={styles.input}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button
          className={styles.button}
          type="button"
          onClick={handleVerifyCode}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default VerifyCode;

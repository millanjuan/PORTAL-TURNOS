import styles from "./password.module.sass";
import useRestore from "../../../../hooks/useRestore";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";

const PasswordChange = () => {
  const { id } = useSelector((state: RootState) => state.restore);
  const initial = {
    password: "",
    password2: "",
    id: id,
  };

  const { passwordError, handlePasswordChange, handleChange } =
    useRestore(initial);
  return (
    <div className={styles.formContainer}>
      <form className={styles.verifyForm}>
        <h2 className={styles.title}>New Password</h2>
        <div className={styles.inputContainer}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={passwordError ? styles.errorInput : styles.input}
            onChange={handleChange}
          />
          {passwordError && <p className={styles.errorText}>{passwordError}</p>}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="password"
            name="password2"
            placeholder="Repeat password"
            className={passwordError ? styles.errorInput : styles.input}
            onChange={handleChange}
          />
          {passwordError && <p className={styles.errorText}>{passwordError}</p>}
        </div>
        <button
          className={styles.button}
          onClick={() => handlePasswordChange()}
          type="button"
        >
          Restore password
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;

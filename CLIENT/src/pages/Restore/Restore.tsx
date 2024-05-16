import styles from "./restore.module.sass";
import logo from "../../assets/images/logoWhite.png";
import logo2 from "../../assets/images/logoBlack.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { restoreStates } from "../../utils/constants/constants";
import VerifyCode from "./Renders/VerifyCode/VerifyCode";
import PasswordChange from "./Renders/PasswordChange/PasswordChange";
import useRestore from "../../hooks/useRestore";

const Restore: React.FC = () => {
  const { handleChange, handleSendCode, emailError } = useRestore("");
  const { status } = useSelector((state: RootState) => state.restore);
  const renderOptions = (state: string) => {
    switch (state) {
      case restoreStates.EMAIL:
        return (
          <div className={styles.formContainer}>
            <form className={styles.restoreForm}>
              <div className={styles.restoreHeader}>
                <img src={logo2} alt="logo2" className={styles.logo2} />
                <h2 className={styles.title}>Enter your email</h2>
              </div>

              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className={emailError ? styles.errorInput : styles.input}
                />
                {emailError && <p className={styles.errorText}>{emailError}</p>}
              </div>

              <button
                type="button"
                className={styles.button}
                onClick={handleSendCode}
              >
                Send Code
              </button>
            </form>
          </div>
        );

      case restoreStates.VERIFY:
        return <VerifyCode />;

      case restoreStates.PASSWORD:
        return <PasswordChange />;

      default:
        break;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>{renderOptions(status)}</div>
      <div className={styles.rightContainer}>
        <div className={styles.overlayTextContainer}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h3 className={styles.overlayTitle}>Patient's portal</h3>
          <p className={styles.overlayText}>
            From here you can get appointments for yourself and your family and
            check the assigned appointments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Restore;

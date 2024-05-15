import styles from "./signIn.module.sass";
import logo from "../../assets/images/logoWhite.png";
import logo2 from "../../assets/images/logoBlack.png";
import useAuth from "../../hooks/useAuth";
import { initialLoginState } from "../../utils/states/authStates";

const SignIn: React.FC = () => {
  const { handleChange, handleLogin, handleNavigate, loginErrors } =
    useAuth(initialLoginState);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.formContainer}>
          <form className={styles.signInForm}>
            <div className={styles.signInHeader}>
              <img src={logo2} alt="logo2" className={styles.logo2} />
              <h2 className={styles.title}>Sign In</h2>
            </div>

            <div className={styles.inputContainer}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className={
                  loginErrors.username ? styles.errorInput : styles.input
                }
              />
              {loginErrors.username && (
                <p className={styles.errorText}>{loginErrors.username}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className={
                  loginErrors.password ? styles.errorInput : styles.input
                }
              />
              {loginErrors.password && (
                <p className={styles.errorText}>{loginErrors.password}</p>
              )}
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={handleLogin}
            >
              Sign in
            </button>
            <footer className={styles.footer}>
              <p>Don't have an account? </p>
              <strong onClick={() => handleNavigate("/signup")}>Sign up</strong>
            </footer>
          </form>
        </div>
      </div>
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

export default SignIn;

import styles from "./signUp.module.sass";
import logo from "../../assets/images/logoWhite.png";
import useAuth from "../../hooks/useAuth";
import { initialRegisterState } from "../../utils/states/authStates";

const SignUp: React.FC = () => {
  const { handleChange, handleRegister, handleNavigate, registerErrors } =
    useAuth(initialRegisterState);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.formContainer}>
          <form className={styles.signUpForm}>
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles.fullnameContainer}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Firstname"
                  onChange={handleChange}
                  className={
                    registerErrors.firstname ? styles.errorInput : styles.input
                  }
                />
                {registerErrors.firstname && (
                  <p className={styles.errorText}>{registerErrors.firstname}</p>
                )}
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  onChange={handleChange}
                  className={
                    registerErrors.lastname ? styles.errorInput : styles.input
                  }
                />
                {registerErrors.lastname && (
                  <p className={styles.errorText}>{registerErrors.lastname}</p>
                )}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className={
                  registerErrors.email ? styles.errorInput : styles.input
                }
              />
              {registerErrors.email && (
                <p className={styles.errorText}>{registerErrors.email}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="date"
                name="birthdate"
                onChange={handleChange}
                className={
                  registerErrors.birthdate ? styles.errorInput : styles.input
                }
              />
              {registerErrors.birthdate && (
                <p className={styles.errorText}>{registerErrors.birthdate}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className={
                  registerErrors.password ? styles.errorInput : styles.input
                }
              />
              {registerErrors.password && (
                <p className={styles.errorText}>{registerErrors.password}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="password2"
                placeholder="Repeat password"
                onChange={handleChange}
                className={
                  registerErrors.password ? styles.errorInput : styles.input
                }
              />
              {registerErrors.password && (
                <p className={styles.errorText}>{registerErrors.password}</p>
              )}
            </div>
            <div className={styles.footerInputs}>
              <div className={styles.selectContainer}>
                <select
                  name="typeidentity"
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="DNI">DNI</option>
                  <option value="CDI">CDI</option>
                  <option value="LC">LC</option>
                  <option value="LE">LE</option>
                </select>
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="identity"
                  placeholder="Identity number"
                  onChange={handleChange}
                  className={
                    registerErrors.identity ? styles.errorInput : styles.input
                  }
                />
                {registerErrors.identity && (
                  <p className={styles.errorText}>{registerErrors.identity}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={handleRegister}
            >
              Sign up
            </button>
            <footer className={styles.footer}>
              <p>Already have an account? </p>
              <strong onClick={() => handleNavigate("/signin")}>Sign in</strong>
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

export default SignUp;

import styles from "./SignUp.module.sass";
import logo from "../../assets/images/logoWhite.png";
import { ISignUp } from "../../utils/interfaces/interfaces";
import useAuth from "../../hooks/useAuth";

const initialState: ISignUp = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  password2: "",
  typeidentity: "DNI",
  identity: null,
};

const SignUp: React.FC = () => {
  const { handleChange, handleRegister, errors } = useAuth(initialState);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.rightContainer}>
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
                    errors.firstname ? styles.errorInput : styles.input
                  }
                />
                {errors.firstname && (
                  <p className={styles.errorText}>{errors.firstname}</p>
                )}
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  onChange={handleChange}
                  className={errors.lastname ? styles.errorInput : styles.input}
                />
                {errors.lastname && (
                  <p className={styles.errorText}>{errors.lastname}</p>
                )}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className={errors.email ? styles.errorInput : styles.input}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className={errors.username ? styles.errorInput : styles.input}
              />
              {errors.username && (
                <p className={styles.errorText}>{errors.username}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className={errors.password ? styles.errorInput : styles.input}
              />
              {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="password2"
                placeholder="Repeat password"
                onChange={handleChange}
                className={errors.password ? styles.errorInput : styles.input}
              />
              {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
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
                  className={errors.identity ? styles.errorInput : styles.input}
                />
                {errors.identity && (
                  <p className={styles.errorText}>{errors.identity}</p>
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
              <strong>Sign in</strong>
            </footer>
          </form>
        </div>
      </div>
      <div className={styles.leftContainer}>
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

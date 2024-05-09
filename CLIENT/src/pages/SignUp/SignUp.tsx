import styles from "./SignUp.module.sass";
import logo from "../../assets/logo.png";
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
  birthdate: "",
};

const SignUp = () => {
  const [handleChange] = useAuth(initialState);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}></div>
      <div className={styles.rightContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
        <form className={styles.signUpForm}>
          <div className={styles.fullnameContainer}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              name="password2"
              placeholder="Repeat password"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.footerInputs}>
            <div className={styles.selectContainer}>
              <select name="typeidentity" onChange={handleChange}>
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
                className={styles.input}
              />
            </div>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

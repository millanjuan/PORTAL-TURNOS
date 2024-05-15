import styles from "./header.module.sass";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logoHeaderBlack.png";
import { capitalizeFirstLetter } from "../../utils/functions/functions";
import { RootState } from "../../redux/store/store";
import UserMenu from "../Menu/UserMenu/UserMenu";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Header: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const capitalizedName =
    userData?.firstname && capitalizeFirstLetter(userData.firstname);
  const capitalizedLastname =
    userData?.lastname && capitalizeFirstLetter(userData.lastname);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.navBarContainer}>
        <NavBar />
      </div>
      <div className={styles.userDataContainer}>
        <p className={styles.fullname}>
          {capitalizedName} {capitalizedLastname}
        </p>
        <button className={styles.logOutButton}>Log out</button>
      </div>
    </header>
  );
};

export default Header;

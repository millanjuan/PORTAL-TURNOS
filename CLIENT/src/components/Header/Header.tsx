import styles from "./header.module.sass";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logoHeader.png";
import { capitalizeFirstLetter } from "../../utils/functions/functions";
import { RootState } from "../../redux/store/store";
import UserMenu from "../Menu/UserMenu/UserMenu";

const Header = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const capitalizedName =
    userData?.firstname && capitalizeFirstLetter(userData.firstname);
  const capitalizedLastname =
    userData?.lastname && capitalizeFirstLetter(userData.lastname);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
      <div className={styles.userDataContainer}>
        <p className={styles.fullname}>
          {capitalizedName} {capitalizedLastname}
        </p>
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;

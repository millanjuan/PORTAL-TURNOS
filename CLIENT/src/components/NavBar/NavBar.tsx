import styles from "./navBar.module.sass";
import { Link, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <nav className={styles.navBar}>
      <ul className={styles.ul}>
        <li className={pathname === "/" ? styles.active : styles.li}>
          <Link to="/">Home</Link>
        </li>
        <li
          className={
            pathname === "/new-appointment" ? styles.active : styles.li
          }
        >
          <Link to="/new-appointment">New Appointment</Link>
        </li>
        <li
          className={
            pathname === "/my-appointments" ? styles.active : styles.li
          }
        >
          <Link to="/my-appointments">My Appointments</Link>
        </li>
        <li
          className={
            pathname === "/account-settings" ? styles.active : styles.li
          }
        >
          <Link to="/account-settings">Account Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

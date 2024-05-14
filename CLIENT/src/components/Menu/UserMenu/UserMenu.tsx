import { useState } from "react";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IoMdHome } from "react-icons/io";
import { BiPlusMedical } from "react-icons/bi";
import { TbReportMedical } from "react-icons/tb";
import { RiUserSettingsFill } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdMenu } from "react-icons/md";
import styles from "./userMenu.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { Link } from "react-router-dom";
import useMenu from "../../../hooks/useMenu";

const UserMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { handleLogOut } = useMenu();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const letter =
    userData?.firstname && userData.firstname.charAt(0).toUpperCase();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <div className={styles.menuContainer} onClick={toggleDrawer(false)}>
      {userData?.picture ? (
        <img src={userData.picture} alt="profile-picture" />
      ) : (
        <div className={styles.letterContainer}>
          <p className={styles.letter}>{letter}</p>
        </div>
      )}

      <List>
        <Link to="/" className={styles.link}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <IoMdHome className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/new-appointment" className={styles.link}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <BiPlusMedical className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary="New appointment" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/appointments" className={styles.link}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <TbReportMedical className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary="My appointments" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/settings" className={styles.link}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <RiUserSettingsFill className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary="Account settings" />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem>
          <ListItemButton onClick={handleLogOut}>
            <ListItemIcon>
              <RiLogoutBoxRLine className={styles.icon} />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={styles.mainContainer}>
      <Button onClick={toggleDrawer(true)} className={styles.menuButton}>
        <MdMenu className={styles.menuIcon} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default UserMenu;

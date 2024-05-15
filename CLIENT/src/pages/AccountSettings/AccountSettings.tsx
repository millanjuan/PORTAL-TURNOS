import styles from "./accountSettings.module.sass";
import FormSettings from "../../components/SettingsForm/SettingsForm";
import { RiUserSettingsFill } from "react-icons/ri";
const AccountSettings = () => {
  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <RiUserSettingsFill className={styles.icon} />
        <h1 className={styles.title}>ACCOUNT SETTINGS</h1>
      </header>
      <div className={styles.body}>
        <FormSettings />
      </div>
    </div>
  );
};

export default AccountSettings;

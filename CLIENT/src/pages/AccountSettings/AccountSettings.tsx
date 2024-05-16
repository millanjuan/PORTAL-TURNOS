import styles from "./accountSettings.module.sass";
import FormSettings from "../../components/SettingsForm/SettingsForm";
import { useState, useEffect } from "react";
const AccountSettings = () => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsHidden(false), 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`${styles.mainContainer} ${isHidden ? styles.hidden : ""}`}>
      <div className={styles.body}>
        <FormSettings />
      </div>
    </div>
  );
};

export default AccountSettings;

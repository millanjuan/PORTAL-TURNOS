import DatePicker from "../../../../components/DatePicker/DatePicker";
import styles from "./dateSelect.module.sass";
import { useState, useEffect } from "react";

const DateSelect = () => {
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsHidden(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.mainContainer} ${isHidden ? styles.hidden : ""}`}>
      <h3 className={styles.title}>Pick a date</h3>
      <DatePicker />
    </div>
  );
};

export default DateSelect;

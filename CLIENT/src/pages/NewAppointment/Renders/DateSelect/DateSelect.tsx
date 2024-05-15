import DatePicker from "../../../../components/DatePicker/DatePicker";
import styles from "./dateSelect.module.sass";

const DateSelect = () => {
  return (
    <div className={styles.mainContainer}>
      <h3 className={styles.title}>Pick a date</h3>
      <DatePicker />
    </div>
  );
};

export default DateSelect;

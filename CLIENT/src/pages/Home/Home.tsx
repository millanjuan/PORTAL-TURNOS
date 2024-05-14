import DatePicker from "../../components/DatePicker/DatePicker";
import styles from "./home.module.sass";

const Home: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}></div>
      <div>
        <DatePicker />
      </div>
      <div></div>
    </div>
  );
};

export default Home;

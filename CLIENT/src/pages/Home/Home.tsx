import DatePicker from "../../components/DatePicker/DatePicker";
import Loading from "../../components/Loading/Loading";
import DateSelect from "../NewAppointment/Renders/DateSelect/DateSelect";
import styles from "./home.module.sass";

const Home: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <DateSelect />
    </div>
  );
};

export default Home;

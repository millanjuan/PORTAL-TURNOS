import styles from "./home.module.sass";
import ActiveAppointments from "../../components/ActiveAppointments/ActiveAppointments";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContainer}>
        <header className={styles.content}>
          <h1 className={styles.title}>Book Your Doctor Appointment Online.</h1>
          <div>
            <p className={styles.text}>Schedule Your Appointment!</p>
            <p className={styles.text}>
              Your Wellness, Our Expertise: Set Up Your Appointment Today.
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.bookButton}
              onClick={() => handleNavigate("/new-appointment")}
            >
              Book An Appointment
            </button>
            <button
              className={styles.appointmentsButton}
              onClick={() => handleNavigate("/new-appointment")}
            >
              My Appointments
            </button>
          </div>
        </header>
      </div>
      <div className={styles.body}>
        <h2 className={styles.subTitle}>My Next Appointments</h2>
        <ActiveAppointments />
      </div>
    </div>
  );
};

export default Home;

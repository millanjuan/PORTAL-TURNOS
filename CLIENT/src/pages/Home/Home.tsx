import styles from "./home.module.sass";
import ActiveAppointments from "../../components/ActiveAppointments/ActiveAppointments";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserAppointmentsAsync } from "../../redux/thunks/appointmentThunk";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    dispatch<any>(getUserAppointmentsAsync());
    const timer = setTimeout(() => setIsHidden(false), 500);
    return () => clearTimeout(timer);
  }, []);
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContainer}>
        <header
          className={`${styles.content} ${isHidden ? styles.hidden : ""}`}
        >
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
              onClick={() => handleNavigate("/my-appointments")}
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

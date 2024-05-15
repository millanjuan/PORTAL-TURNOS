import AppointmentCards from "../../../../components/AppointmentCards/AppointmentCards";
import { RootState } from "../../../../redux/store/store";
import styles from "./confirm.module.sass";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Confirm: React.FC = () => {
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsHidden(false), 100);
    return () => clearTimeout(timer);
  }, []);
  const appointments = useSelector(
    (state: RootState) => state.appointment.dateAppointments
  );
  return (
    <div className={`${styles.mainContainer} ${isHidden ? styles.hidden : ""}`}>
      <h3 className={styles.title}>Availability</h3>
      <AppointmentCards appointments={appointments} />
    </div>
  );
};

export default Confirm;

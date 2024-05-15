import AppointmentCards from "../../../../components/AppointmentCards/AppointmentCards";
import { RootState } from "../../../../redux/store/store";
import styles from "./confirm.module.sass";
import { useSelector } from "react-redux";

const Confirm: React.FC = () => {
  const appointments = useSelector(
    (state: RootState) => state.appointment.dateAppointments
  );
  return (
    <div className={styles.mainContainer}>
      <h3 className={styles.title}>Availability</h3>
      <AppointmentCards appointments={appointments} />
    </div>
  );
};

export default Confirm;

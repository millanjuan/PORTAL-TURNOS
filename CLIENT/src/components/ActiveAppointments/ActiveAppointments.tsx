import styles from "./activeAppointments.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import UserAppointmentsCards from "../UserAppointmentsCards/UserAppointmentsCards";
import { IUserAppointments } from "../../utils/interfaces/appointmentInterface";
const ActiveAppointments: React.FC = () => {
  const activeAppointments = useSelector(
    (state: RootState) => state.appointment.userActiveAppointments
  );
  return (
    <div className={styles.mainContainer}>
      <UserAppointmentsCards
        appointments={activeAppointments as IUserAppointments[]}
      />
    </div>
  );
};

export default ActiveAppointments;

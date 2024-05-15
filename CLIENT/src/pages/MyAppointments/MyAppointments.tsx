import styles from "./myAppointments.module.sass";
import ActiveAppointments from "../../components/ActiveAppointments/ActiveAppointments";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserAppointmentsAsync } from "../../redux/thunks/appointmentThunk";

const MyAppointments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getUserAppointmentsAsync());
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.body}>
        <h2 className={styles.subTitle}>My Next Appointments</h2>
        <ActiveAppointments />
      </div>
    </div>
  );
};

export default MyAppointments;

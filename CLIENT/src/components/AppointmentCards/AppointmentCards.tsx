import AppointmentCard from "../AppointmentCard/AppointmentCard";
import styles from "./appointmentCards.module.sass";
import { IAppointmentSchuddle } from "../../utils/interfaces/appointmentInterface";

const AppointmentCards: React.FC<any> = ({ appointments }) => {
  return (
    <div className={styles.cardsContainer}>
      {appointments &&
        appointments.map((appointment: IAppointmentSchuddle) => {
          return (
            <AppointmentCard
              key={appointment._id}
              id={appointment._id}
              startTime={appointment.startTime}
            />
          );
        })}
    </div>
  );
};

export default AppointmentCards;

import styles from "./userAppointmentsCards.module.sass";
import { IUserAppointments } from "../../utils/interfaces/appointmentInterface";
import UserAppointmentsCard from "../UserAppointmentsCard/UserAppointmentsCard";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const UserAppointmentsCards: React.FC<{
  appointments: IUserAppointments[];
}> = ({ appointments }) => {
  const { loading } = useSelector((state: RootState) => state.appointment);

  return (
    <div
      className={
        appointments.length > 0
          ? styles.cardsContainer
          : styles.noCardsContainer
      }
    >
      {loading ? (
        <Loading />
      ) : appointments.length > 0 ? (
        appointments.map((appointment) => {
          return (
            <UserAppointmentsCard
              key={appointment._id}
              id={appointment._id}
              date={appointment.date}
              startTime={appointment.startTime}
              endTime={appointment.endTime}
              professionalFirstname={appointment.professional.firstname}
              professionalLastname={appointment.professional.lastname}
              professionalImage={appointment.professional.image}
              speciality={appointment.professional.speciality.name}
            />
          );
        })
      ) : (
        <p>You still don't have medical appointments</p>
      )}
    </div>
  );
};

export default UserAppointmentsCards;

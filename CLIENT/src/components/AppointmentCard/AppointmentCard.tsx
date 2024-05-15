import { getHourFromDate } from "../../utils/functions/functions";
import styles from "./appointmentCard.module.sass";
import { IAppointmentSchuddle } from "../../utils/interfaces/appointmentInterface";
import {
  setApointmentState,
  setChosenAppointment,
} from "../../redux/slices/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { newAppointmentState } from "../../utils/constants/appointmentConstants";
import { RootState } from "../../redux/store/store";

const AppointmentCard: React.FC<IAppointmentSchuddle> = ({ id, startTime }) => {
  const actualId = useSelector(
    (state: RootState) => state.appointment.chosenAppointment
  );
  const isActual = actualId === id;
  const dispatch = useDispatch();

  const handleChoose = async (id: string) => {
    await dispatch<any>(setChosenAppointment(id));
    await dispatch<any>(setApointmentState(newAppointmentState.FINISH));
  };

  const formattedStart = getHourFromDate(startTime);

  return (
    <button
      className={isActual ? styles.actualCard : styles.cardContainer}
      onClick={() => handleChoose(id as string)}
    >
      <p>{formattedStart}</p>
    </button>
  );
};

export default AppointmentCard;

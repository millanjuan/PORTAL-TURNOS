import { RootState } from "../../redux/store/store";
import styles from "./newAppointment.module.sass";
import { useSelector } from "react-redux";
import { newAppointmentState } from "../../utils/constants/appointmentConstants";
import SpecialitySelect from "./Renders/SpecialitySelect/SpecialitySelect";
import DateSelect from "./Renders/DateSelect/DateSelect";
import Confirm from "./Renders/Confirm/Confirm";

const NewAppointment = () => {
  const appointmentState = useSelector(
    (state: RootState) => state.appointment.appointmentState
  );
  const renderContent = (state: string) => {
    switch (state) {
      case newAppointmentState.SPECIALITY:
        return <SpecialitySelect />;

      case newAppointmentState.PROFESSIONAL:
        return <SpecialitySelect />;

      case newAppointmentState.DATE:
        return <DateSelect />;

      case newAppointmentState.CONFIRM:
        return <Confirm />;
      default:
        break;
    }
  };
  return (
    <div className={styles.mainContainer}>
      {renderContent(appointmentState)}
    </div>
  );
};

export default NewAppointment;

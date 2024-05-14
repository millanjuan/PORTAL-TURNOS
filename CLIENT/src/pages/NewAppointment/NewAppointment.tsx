import { RootState } from "../../redux/store/store";
import styles from "./newAppointment.module.sass";
import { useSelector, useDispatch } from "react-redux";
import { newAppointmentState } from "../../utils/constants/appointmentConstants";
import SpecialitySelect from "./Renders/SpecialitySelect/SpecialitySelect";
import ProfessionalSelect from "./Renders/ProfessionalSelect/ProfessionalSelect";
import Confirm from "./Renders/Confirm/Confirm";
import CalendarPicker from "../../components/CalendarPicker/CalendarPicker";
import { useEffect } from "react";
import { setApointmentState } from "../../redux/slices/appointmentSlice";

const NewAppointment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setApointmentState(newAppointmentState.SPECIALITY));
  }, []);

  const appointmentState = useSelector(
    (state: RootState) => state.appointment.appointmentState
  );
  const renderContent = (state: string) => {
    switch (state) {
      case newAppointmentState.SPECIALITY:
        return <SpecialitySelect />;

      case newAppointmentState.PROFESSIONAL:
        return <ProfessionalSelect />;

      case newAppointmentState.DATE:
        return <CalendarPicker />;

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

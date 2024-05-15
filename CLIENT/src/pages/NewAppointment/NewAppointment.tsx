import { RootState } from "../../redux/store/store";
import styles from "./newAppointment.module.sass";
import { useSelector, useDispatch } from "react-redux";
import { newAppointmentState } from "../../utils/constants/appointmentConstants";
import SpecialitySelect from "./Renders/SpecialitySelect/SpecialitySelect";
import ProfessionalSelect from "./Renders/ProfessionalSelect/ProfessionalSelect";
import Confirm from "./Renders/Confirm/Confirm";
import { useEffect } from "react";
import { setApointmentState } from "../../redux/slices/appointmentSlice";
import DateSelect from "./Renders/DateSelect/DateSelect";
import FooterButtons from "./Renders/FooterButtons/FooterButtons";

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
        return (
          <>
            <ProfessionalSelect />
            <FooterButtons />
          </>
        );

      case newAppointmentState.DATE:
        return (
          <>
            <ProfessionalSelect />
            <div className={styles.confirmContainer}>
              <div className={styles.leftContainer}>
                <DateSelect />
              </div>
              <div className={styles.rightContainer}></div>
            </div>
            <FooterButtons />
          </>
        );

      case newAppointmentState.CONFIRM:
        return (
          <>
            <ProfessionalSelect />
            <div className={styles.confirmContainer}>
              <div className={styles.leftContainer}>
                <DateSelect />
              </div>
              <div className={styles.rightContainer}>
                <Confirm />
              </div>
            </div>
            <FooterButtons />
          </>
        );
      case newAppointmentState.FINISH:
        return (
          <>
            <ProfessionalSelect />
            <div className={styles.confirmContainer}>
              <div className={styles.leftContainer}>
                <DateSelect />
              </div>
              <div className={styles.rightContainer}>
                <Confirm />
              </div>
            </div>
            <FooterButtons />
          </>
        );
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

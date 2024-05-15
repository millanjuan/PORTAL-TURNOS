import Swal from "sweetalert2";
import { clearSchuddle } from "../../../../redux/slices/appointmentSlice";
import { RootState } from "../../../../redux/store/store";
import {
  getUserAppointmentsAsync,
  schuddleAsync,
} from "../../../../redux/thunks/appointmentThunk";
import { newAppointmentState } from "../../../../utils/constants/appointmentConstants";
import styles from "./footerButtons.module.sass";
import { useSelector, useDispatch } from "react-redux";

const FooterButtons: React.FC = () => {
  const dispatch = useDispatch();
  const { appointmentState, chosenAppointment } = useSelector(
    (state: RootState) => state.appointment
  );
  const isFinished: boolean =
    appointmentState === newAppointmentState.FINISH ? true : false;
  const handleSchuddle = async (id: string) => {
    const { payload }: any = await dispatch<any>(schuddleAsync(id));
    if (payload.success) {
      await dispatch<any>(getUserAppointmentsAsync());
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Appointment successfully schuddled",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.close();
          dispatch(clearSchuddle());
        }
      });
    }
  };

  const handleBack = () => {
    dispatch(clearSchuddle());
  };

  return (
    <footer className={styles.footer}>
      <button className={styles.backButton} onClick={() => handleBack()}>
        Back
      </button>
      <button
        className={isFinished ? styles.continueButton : styles.disabledButton}
        disabled={!isFinished}
        onClick={() => handleSchuddle(chosenAppointment)}
      >
        Schuddle
      </button>
    </footer>
  );
};

export default FooterButtons;

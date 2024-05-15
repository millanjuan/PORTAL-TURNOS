import { useState } from "react";
import { DayPicker } from "react-day-picker";
import styles from "./datePicker.module.sass";
import { useDispatch, useSelector } from "react-redux";
import "react-day-picker/dist/style.css";
import { getAppointmentsByDateAsync } from "../../redux/thunks/appointmentThunk";
import { RootState } from "../../redux/store/store";
import { errorAlert } from "../../utils/alerts/alerts";
import { setApointmentState } from "../../redux/slices/appointmentSlice";
import { newAppointmentState } from "../../utils/constants/appointmentConstants";

const DatePicker: React.FC = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const professionalId = useSelector(
    (state: RootState) => state.appointment.currentProfessional
  );

  const handleSelect = async (current: Date | undefined) => {
    setSelected(current);
    if (current) {
      const date = current.toISOString();
      const { payload } = await dispatch<any>(
        getAppointmentsByDateAsync({ date, professionalId })
      );
      payload.success
        ? dispatch(setApointmentState(newAppointmentState.CONFIRM))
        : errorAlert(payload.error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        modifiersClassNames={{
          selected: styles.mySelect,
          today: styles.myToday,
        }}
      />
    </div>
  );
};

export default DatePicker;

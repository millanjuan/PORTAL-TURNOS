import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import styles from "./datePicker.module.sass";
import { useDispatch, useSelector } from "react-redux";
import "react-day-picker/dist/style.css";
import { getAppointmentsByDateAsync } from "../../redux/thunks/appointmentThunk";

const DatePicker = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [formattedDate, setFormattedDate] = useState<string | undefined>(
    undefined
  );

  const handleSelect = async (date: Date | undefined) => {
    setSelected(date);
    if (date) {
      const formatted = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      await dispatch(getAppointmentsByDateAsync(formatted));
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

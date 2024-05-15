import React, { useEffect, useState } from "react";
import { getAppointmentsByMonthAsync } from "../../redux/thunks/appointmentThunk";
import { IProfessionalCardProps } from "../../utils/interfaces/professionalInterface";
import styles from "./ProfessionalCard.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { getMonth, getYear } from "date-fns";
import { newAppointmentState } from "../../utils/constants/appointmentConstants";
import {
  setApointmentState,
  setCurrentProfessional,
} from "../../redux/slices/appointmentSlice";
import { errorAlert } from "../../utils/alerts/alerts";
import { RootState } from "../../redux/store/store";

const ProfessionalCard: React.FC<IProfessionalCardProps> = ({
  id,
  firstname,
  lastname,
  image,
}) => {
  const dispatch = useDispatch();
  const actualId = useSelector(
    (state: RootState) => state.appointment.currentProfessional
  );
  const isActual = actualId === id;
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsHidden(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSetDateSelect = async (
    professionalId: string,
    state: string,
    id: string
  ) => {
    const currentDate = new Date();
    const month = getMonth(currentDate);
    const year = getYear(currentDate);
    const { payload } = await dispatch<any>(
      getAppointmentsByMonthAsync({ year, month, professionalId })
    );
    dispatch(setApointmentState(state));
    dispatch(setCurrentProfessional(id));
    !payload.success && errorAlert(payload.error);
  };

  return (
    <div
      className={`${isActual ? styles.actualCard : styles.cardContainer} ${
        isHidden ? styles.hidden : ""
      }`}
      onClick={() => handleSetDateSelect(id, newAppointmentState.DATE, id)}
    >
      <img src={image} alt="image" className={styles.image} />
      <p className={styles.name}>
        {firstname} {lastname}
      </p>
    </div>
  );
};

export default ProfessionalCard;

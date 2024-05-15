import React from "react";
import { IUserAppointment } from "../../utils/interfaces/appointmentInterface";
import styles from "./userAppointmentsCard.module.sass";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../utils/functions/functions";
import { MdAccessTime } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import { useDispatch } from "react-redux";
import {
  cancelAsync,
  getUserAppointmentsAsync,
} from "../../redux/thunks/appointmentThunk";
import { successAlert } from "../../utils/alerts/alerts";

const UserAppointmentsCard: React.FC<IUserAppointment> = ({
  id,
  date,
  startTime,
  endTime,
  professionalFirstname,
  professionalLastname,
  professionalImage,
  speciality,
}) => {
  const dispatch = useDispatch();
  const handleCancelAppointment = async (id: string) => {
    try {
      const { payload } = await dispatch<any>(cancelAsync(id));
      if (payload.success) await dispatch<any>(getUserAppointmentsAsync());
      successAlert("Appointment successfully canceled.");
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.title}>Appointment Date</h2>
      <header className={styles.header}>
        <p className={styles.dateText}>{formatDate(date, 0, 10)}</p>
        <TbPointFilled className={styles.pointIcon} />
        <p className={styles.dateText}>
          {formatDate(startTime, 11, 16)} - {formatDate(endTime, 11, 16)}
        </p>
        <MdAccessTime className={styles.timeIcon} />
      </header>
      <div className={styles.professionalInformation}>
        <img src={professionalImage} alt="picture" className={styles.picture} />
        <div className={styles.textContainer}>
          <p className={styles.medicName}>
            {capitalizeFirstLetter(professionalFirstname)}{" "}
            {capitalizeFirstLetter(professionalLastname)}
          </p>
          <p className={styles.specialityName}>
            {capitalizeFirstLetter(speciality)}
          </p>
        </div>
      </div>
      <button
        className={styles.cancelButton}
        onClick={() => handleCancelAppointment(id)}
      >
        Cancel
      </button>
    </div>
  );
};

export default UserAppointmentsCard;

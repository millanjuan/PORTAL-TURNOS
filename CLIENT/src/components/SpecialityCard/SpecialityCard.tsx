import { useEffect, useState } from "react";
import styles from "./specialityCard.module.sass";
import { SpecialityCardProps } from "../../utils/interfaces/specialityInterface";
import { useDispatch } from "react-redux";
import { getProfessionalsBySpecialityAsync } from "../../redux/thunks/professionalThunk";
import {
  setApointmentState,
  setCurrentSpeciality,
} from "../../redux/slices/appointmentSlice";
import { newAppointmentState } from "../../utils/constants/appointmentConstants";

const SpecialityCard: React.FC<SpecialityCardProps> = ({ id, name, image }) => {
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsHidden(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSetProfessionals = async (id: string, state: string) => {
    await dispatch<any>(getProfessionalsBySpecialityAsync(id));
    dispatch(setApointmentState(state));
    dispatch(setCurrentSpeciality(name));
  };

  return (
    <div
      className={`${styles.cardContainer} ${isHidden ? styles.hidden : ""}`}
      onClick={() =>
        handleSetProfessionals(id, newAppointmentState.PROFESSIONAL)
      }
    >
      <h2 className={styles.cardName}>{name}</h2>
      <img src={image} alt="image" className={styles.cardImage} />
    </div>
  );
};

export default SpecialityCard;

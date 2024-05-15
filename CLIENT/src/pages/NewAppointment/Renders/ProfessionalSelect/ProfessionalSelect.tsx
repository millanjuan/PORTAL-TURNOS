import ProfessionalCards from "../../../../components/ProfessionalCards/ProfessionalCards";
import { RootState } from "../../../../redux/store/store";
import styles from "./professionalSelect.module.sass";
import { useSelector } from "react-redux";

const ProfessionalSelect: React.FC = () => {
  const professionals = useSelector(
    (state: RootState) => state.professional.professionals
  );
  const speciality = useSelector(
    (state: RootState) => state.appointment.currentSpeciality
  );
  return (
    <div className={styles.mainContainer}>
      <h3 className={styles.title}>
        Select any available doctor for: {speciality}
      </h3>
      <ProfessionalCards professionals={professionals as []} />
    </div>
  );
};

export default ProfessionalSelect;

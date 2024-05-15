import ProfessionalCards from "../../../../components/ProfessionalCards/ProfessionalCards";
import { RootState } from "../../../../redux/store/store";
import styles from "./professionalSelect.module.sass";
import { useSelector } from "react-redux";

const ProfessionalSelect: React.FC = () => {
  const professionals = useSelector(
    (state: RootState) => state.professional.professionals
  );
  return (
    <div className={styles.mainContainer}>
      <h3 className={styles.title}>Select any available doctor</h3>
      <ProfessionalCards professionals={professionals as []} />
    </div>
  );
};

export default ProfessionalSelect;

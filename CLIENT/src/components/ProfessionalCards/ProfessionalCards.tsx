import {
  IProfessional2,
  IProfessionalProps,
} from "../../utils/interfaces/professionalInterface";
import ProfessionalCard from "../ProfessionalCard/ProfessionalCard";
import styles from "./ProfessionalCards.module.sass";

const ProfessionalCards: React.FC<IProfessionalProps> = ({ professionals }) => {
  return (
    <div className={styles.mainContainer}>
      {professionals &&
        professionals.map((professional: IProfessional2) => {
          return (
            <ProfessionalCard
              key={professional._id}
              id={professional._id}
              firstname={professional.firstname}
              lastname={professional.lastname}
              image={professional.image}
            />
          );
        })}
    </div>
  );
};

export default ProfessionalCards;

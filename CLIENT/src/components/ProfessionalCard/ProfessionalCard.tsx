import { IProfessionalCardProps } from "../../utils/interfaces/professionalInterface";
import styles from "./ProfessionalCard.module.sass";

const ProfessionalCard: React.FC<IProfessionalCardProps> = ({
  id,
  firstname,
  lastname,
  image,
}) => {
  return (
    <div className={styles.cardContainer}>
      <img src={image} alt="image" className={styles.image} />
      <p className={styles.name}>
        {firstname} {lastname}
      </p>
    </div>
  );
};

export default ProfessionalCard;

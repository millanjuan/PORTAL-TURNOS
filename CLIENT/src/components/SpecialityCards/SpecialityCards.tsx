import styles from "./specialityCards.module.sass";
import {
  ISpeciality,
  SpecialityCardsProps,
} from "../../utils/interfaces/specialityInterface";
import SpecialityCard from "../SpecialityCard/SpecialityCard";

const SpecialityCards: React.FC<SpecialityCardsProps> = ({ specialities }) => {
  return (
    <div className={styles.mainContainer}>
      {specialities &&
        specialities.map((speciality: ISpeciality) => {
          return (
            <SpecialityCard
              key={speciality.name}
              id={speciality._id}
              name={speciality.name}
              image={speciality.image}
            />
          );
        })}
    </div>
  );
};

export default SpecialityCards;

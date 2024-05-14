import styles from "./specialitySelect.module.sass";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpecialitiesAsync } from "../../../../redux/thunks/specialityThunk";
import SpecialityCards from "../../../../components/SpecialityCards/SpecialityCards";
import { RootState } from "../../../../redux/store/store";

const SpecialitySelect: React.FC = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const specialities = useSelector(
    (state: RootState) => state.speciality.specialities
  );
  useEffect(() => {
    dispatch<any>(getSpecialitiesAsync());
  }, [token]);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Please select a speciality:</h1>
      <SpecialityCards specialities={specialities} />
    </div>
  );
};

export default SpecialitySelect;

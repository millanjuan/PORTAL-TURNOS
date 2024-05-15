import styles from "./specialitySelect.module.sass";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpecialitiesAsync } from "../../../../redux/thunks/specialityThunk";
import SpecialityCards from "../../../../components/SpecialityCards/SpecialityCards";
import { RootState } from "../../../../redux/store/store";
import Loading from "../../../../components/Loading/Loading";

const SpecialitySelect: React.FC = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { specialities, loading } = useSelector(
    (state: RootState) => state.speciality
  );
  useEffect(() => {
    dispatch<any>(getSpecialitiesAsync());
  }, [token]);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Please select a speciality:</h1>
      {loading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <SpecialityCards specialities={specialities} />
      )}
    </div>
  );
};

export default SpecialitySelect;

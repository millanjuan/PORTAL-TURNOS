import styles from "./loading.module.sass";
import loading from "../../assets/images/loadingGreyBg.gif";
const Loading: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <img src={loading} alt="loading" className={styles.loading} />
    </div>
  );
};

export default Loading;

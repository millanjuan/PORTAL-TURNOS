import notFound from "../../assets/images/notFound.png";
import styles from "./notFound.module.sass";

const NotFound = () => {
  return (
    <div className={styles.mainContainer}>
      <img src={notFound} className={styles.png} alt="notfound" />
    </div>
  );
};

export default NotFound;

import styles from "./home.module.sass";

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContainer}>
        <header className={styles.content}>
          <h1 className={styles.title}>Book Your Doctor Appointment Online.</h1>
          <div>
            <p className={styles.text}>Schedule Your Appointment!</p>
            <p className={styles.text}>
              Your Wellness, Our Expertise: Set Up Your Appointment Today.
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.bookButton}>Book An Appointment</button>
            <button className={styles.appointmentsButton}>
              My Appointments
            </button>
          </div>
        </header>
      </div>
      <body className={styles.body}>
        <h2 className={styles.subTitle}>My Next Appointments</h2>
      </body>
    </div>
  );
};

export default Home;

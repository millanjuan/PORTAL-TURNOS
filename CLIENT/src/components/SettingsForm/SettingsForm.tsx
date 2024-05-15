import styles from "./settingsForm.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import Loading from "../Loading/Loading";
import { capitalizeFirstLetter } from "../../utils/functions/functions";
import profile from "../../assets/images/profilePicture.jpg";
import { genderOptions } from "../../utils/constants/constants";
import { IUpdate } from "../../utils/interfaces/userInterface";
import useUpdate from "../../hooks/useUpdate";

const SettingsForm = () => {
  const { userData, loading } = useSelector((state: RootState) => state.auth);

  const initialUpdateState: IUpdate = {
    address: userData?.address || "",
    cellphone: userData?.cellphone || "",
    gender: userData?.gender || "Male",
    birthdate: userData?.birthdate || "",
    picture: userData?.picture || "",
  };

  const {
    handleChange,
    handleUpdateUser,
    handleEditBirthdate,
    handleImageChange,
    handleImageRemove,
    user,
    editableBirthdate,
  } = useUpdate(initialUpdateState);

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Profile picture</p>
        </div>
        <div className={styles.photoContainer}>
          {user.picture ? (
            <div className={styles.noPhotoContainer}>
              <img
                src={URL.createObjectURL(user.picture as any)}
                alt="profile-picture"
                className={styles.avatar}
              />
              <button
                className={styles.deleteButton}
                onClick={handleImageRemove}
              >
                X
              </button>
            </div>
          ) : (
            <>
              <div className={styles.noPhotoContainer}>
                <img src={profile} alt="avatar" className={styles.avatar} />
              </div>
              <div className={styles.buttonsContainer}>
                <input
                  type="file"
                  accept="image/*"
                  className={styles.photoInput}
                  onChange={handleImageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Lastname</p>
        </div>
        <div className={styles.fieldContainer}>
          <p className={styles.uneditable}>
            {capitalizeFirstLetter(userData.lastname)}
          </p>
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Name</p>
        </div>
        <div className={styles.fieldContainer}>
          <p className={styles.uneditable}>
            {capitalizeFirstLetter(userData.firstname)}
          </p>
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Identity</p>
        </div>
        <div className={styles.fieldContainer}>
          <p className={styles.uneditable}>
            {userData.typeidentity.toUpperCase()} {userData.identity}
          </p>
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Address</p>
        </div>
        <div className={styles.fieldContainer}>
          <input
            name="address"
            placeholder="Enter your address"
            value={user.address}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Cellphone</p>
        </div>
        <div className={styles.fieldContainer}>
          <input
            name="cellphone"
            placeholder="Enter your cellphone"
            value={user.cellphone}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Gender</p>
        </div>
        <div className={styles.fieldContainer}>
          <select
            name="gender"
            value={user.gender}
            className={styles.select}
            onChange={handleChange}
          >
            {genderOptions.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Birthdate</p>
        </div>
        <div className={styles.fieldContainer}>
          {userData.birthdate ? (
            <p>{userData.birthdate}</p>
          ) : (
            <input
              type="date"
              name="birthdate"
              placeholder="Birthdate"
              value={user.birthdate as any}
              className={styles.input}
              onChange={handleChange}
            />
          )}
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Email</p>
        </div>
        <div className={styles.fieldContainer}>
          <p className={styles.uneditable}>{userData.email}</p>
        </div>
      </div>
      <button className={styles.saveButton} onClick={handleUpdateUser}>
        Save
      </button>
    </div>
  );
};

export default SettingsForm;

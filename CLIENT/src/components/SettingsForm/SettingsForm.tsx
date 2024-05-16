import styles from "./settingsForm.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import Loading from "../Loading/Loading";
import { capitalizeFirstLetter } from "../../utils/functions/functions";
import profile from "../../assets/images/profilePicture.jpg";
import { genderOptions } from "../../utils/constants/constants";
import { IUpdate } from "../../utils/interfaces/userInterface";
import useUpdate from "../../hooks/useUpdate";
import Avatar from "react-avatar-edit";
import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const SettingsForm: React.FC = () => {
  const { userData, loading } = useSelector((state: RootState) => state.auth);
  const initialUpdateState: IUpdate = {
    address: userData?.address,
    cellphone: userData?.cellphone,
    gender: userData?.gender,
    picture: userData?.picture,
  };
  const [editableFields, setEditableFields] = useState({
    address: false,
    cellphone: false,
    gender: false,
  });

  const handleEditField = (fieldName: string) => {
    setEditableFields({
      ...editableFields,
      [fieldName]: true,
    });
  };
  const handleCancelEdit = (fieldName: string) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [fieldName]: false,
    }));
  };

  const {
    handleChange,
    handleUpdateUser,
    handleImageChange,
    handleCancelClickPhoto,
    handleEditPhoto,
    editablePhoto,
    user,
  } = useUpdate(initialUpdateState);

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.dataContainer1}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName1}>Profile picture</p>
        </div>
        <div className={styles.photoContainer}>
          {!editablePhoto ? (
            <div className={styles.notEditable}>
              {userData.picture ? (
                <div className={styles.pictureContainer}>
                  <img src={userData.picture} alt="profile" />
                  <button
                    className={styles.editButton}
                    onClick={handleEditPhoto}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className={styles.avatarContainer}>
                  <img src={profile} alt="avatar" className={styles.avatar} />
                  <button
                    className={styles.editButton}
                    onClick={handleEditPhoto}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.editablePhoto}>
              <Avatar width={200} height={200} onCrop={handleImageChange} />
              <button
                className={styles.cancelButton}
                onClick={handleCancelClickPhoto}
              >
                Cancel
              </button>
            </div>
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
          {editableFields.address ? (
            <input
              name="address"
              placeholder={"Enter your address"}
              value={user.address}
              className={styles.input}
              onChange={handleChange}
            />
          ) : (
            <p>{userData.address}</p>
          )}
        </div>
        {!editableFields.address ? (
          <button
            className={styles.edit}
            onClick={() => handleEditField("address")}
          >
            <FaPencil className={styles.icon} />
          </button>
        ) : (
          <button
            className={styles.edit}
            onClick={() => handleCancelEdit("address")}
          >
            <MdCancel className={styles.iconCancel} />
          </button>
        )}
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Cellphone</p>
        </div>
        <div className={styles.fieldContainer}>
          {editableFields.cellphone ? (
            <input
              name="cellphone"
              placeholder={"Enter your cellphone"}
              value={user.cellphone}
              className={styles.input}
              onChange={handleChange}
            />
          ) : (
            <p>{userData.cellphone}</p>
          )}
        </div>
        {!editableFields.cellphone ? (
          <button
            className={styles.edit}
            onClick={() => handleEditField("cellphone")}
          >
            <FaPencil className={styles.icon} />
          </button>
        ) : (
          <button
            className={styles.edit}
            onClick={() => handleCancelEdit("cellphone")}
          >
            <MdCancel className={styles.iconCancel} />
          </button>
        )}
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Gender</p>
        </div>
        <div className={styles.fieldContainer}>
          {editableFields.gender ? (
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
          ) : (
            <p>{userData.gender}</p>
          )}
        </div>
        {!editableFields.gender ? (
          <button
            className={styles.edit}
            onClick={() => handleEditField("gender")}
          >
            <FaPencil className={styles.icon} />
          </button>
        ) : (
          <button
            className={styles.edit}
            onClick={() => handleCancelEdit("gender")}
          >
            <MdCancel className={styles.iconCancel} />
          </button>
        )}
      </div>

      <div className={styles.dataContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fieldName}>Birthdate</p>
        </div>
        <div className={styles.fieldContainer}>
          <p className={styles.uneditable}>{userData.birthdate}</p>
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

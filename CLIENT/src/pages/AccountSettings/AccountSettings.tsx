import React, { useState } from "react";
import styles from "./accountSettings.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const AccountSettings = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);

  const [formData, setFormData] = useState({
    email: userData.email,
    username: userData.username,
    firstname: userData.firstname,
    lastname: userData.lastname,
    identity: userData.identity,
    typeidentity: userData.typeidentity,
    address: userData.address || "",
    cellphone: userData.cellphone || "",
    gender: userData.gender || "",
    birthdate: userData.birthdate || "",
    picture: userData.picture || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.dataContainer}>
        <p>Foto de perfil</p>
        {formData.picture ? (
          <img src={formData.picture} alt="profile-picture" />
        ) : (
          <p>Sin foto de perfil</p>
        )}
      </div>
      <div className={styles.dataContainer}>
        <p>Apellido/s</p>
        <input
          name="lastname"
          placeholder="Lastname"
          value={formData.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.dataContainer}>
        <p>Nombre/s</p>
        <input
          name="firstname"
          placeholder="Firstname"
          value={formData.firstname}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.dataContainer}>
        <p>Identity</p>
        <p>
          {formData.typeidentity} {formData.identity}
        </p>
      </div>
      <div className={styles.dataContainer}>
        <p>Address</p>
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.dataContainer}>
        <p>Cellphone</p>
        <input
          name="cellphone"
          placeholder="Cellphone"
          value={formData.cellphone}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.dataContainer}>
        <p>Gender</p>
        <input
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.dataContainer}>
        <p>Birthdate</p>
        <input
          name="birthdate"
          placeholder="Birthdate"
          value={formData.birthdate}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.dataContainer}>
        <p>Email</p>
        <p>{formData.email}</p>
      </div>
    </div>
  );
};

export default AccountSettings;

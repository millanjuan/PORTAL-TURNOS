import { useState, ChangeEvent } from "react";
import { IUpdate } from "../utils/interfaces/userInterface";
import { IUpdateErrors } from "../utils/interfaces/authInterface";
import { initialUpdateErrorState } from "../utils/states/authStates";
import { useDispatch } from "react-redux";
import { updateUserAsync } from "../redux/thunks/authThunk";
import { errorAlert, updateSwal } from "../utils/alerts/alerts";
import axios from "axios";

const useUpdate = (initialState: IUpdate) => {
  const [user, setUser] = useState<IUpdate>(initialState);
  const [errors, setErrors] = useState<IUpdateErrors>(initialUpdateErrorState);
  const [editablePhoto, setEditablePhoto] = useState(false);
  const [editableFields, setEditableFields] = useState({
    address: false,
    cellphone: false,
    gender: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const handleEditField = (fieldName: string) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [fieldName]: true,
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageChange = (image: any) => {
    setSelectedImage(image);
  };
  const handleCancelClickPhoto = () => {
    setEditablePhoto(false);
    setSelectedImage(null);
  };
  const handleEditPhoto = () => {
    setEditablePhoto(true);
  };

  const handleDetelePhoto = () => {
    setUser({
      ...user,
      picture: "",
    });
  };

  const handleImageRemove = () => {
    setUser({ ...user, picture: "" });
  };

  const handleUpdateUser = async () => {
    let updatedUserInfo = { ...user };
    if (selectedImage && selectedImage.length > 2) {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", selectedImage);
      formDataCloudinary.append("upload_preset", "AUDITAR");
      const responseCloudinary = await axios.post(
        "https://api.cloudinary.com/v1_1/dhu3uii7o/image/upload",
        formDataCloudinary
      );
      const cloudinaryData = responseCloudinary.data;

      if (cloudinaryData.secure_url) {
        updatedUserInfo.picture = cloudinaryData.secure_url;
      }
    }

    try {
      const { payload } = await dispatch<any>(updateUserAsync(updatedUserInfo));
      if (!payload.success) errorAlert(payload.error);
      setEditablePhoto(false);
      setEditableFields({
        address: false,
        cellphone: false,
        gender: false,
      });
      updateSwal();
    } catch (error) {
      throw error;
    }
  };

  return {
    handleChange,
    handleUpdateUser,
    handleImageChange,
    handleImageRemove,
    handleCancelClickPhoto,
    handleEditPhoto,
    handleDetelePhoto,
    editablePhoto,
    editableFields,
    handleEditField,
    user,
  };
};

export default useUpdate;

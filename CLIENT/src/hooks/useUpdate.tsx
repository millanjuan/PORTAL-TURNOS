import { useState, ChangeEvent } from "react";
import { IUpdate } from "../utils/interfaces/userInterface";
import { IUpdateErrors } from "../utils/interfaces/authInterface";
import { initialUpdateErrorState } from "../utils/states/authStates";
import { useDispatch } from "react-redux";
import { updateUserAsync } from "../redux/thunks/authThunk";
import { successAlert } from "../utils/alerts/alerts";

const useUpdate = (initialState: IUpdate) => {
  const [user, setUser] = useState<IUpdate>(initialState);
  const [errors, setErrors] = useState<IUpdateErrors>(initialUpdateErrorState);
  const [editableBirthdate, setEditableBirthdate] = useState(false);
  const [blob, setBlob] = useState(null);
  const dispatch = useDispatch();

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

  const handleUpdateUser = async () => {
    console.log(user);
    try {
      const { payload } = await dispatch<any>(updateUserAsync(user));
      payload.success && successAlert("Data correctly saved.");
    } catch (error) {
      throw error;
    }
  };

  const handleEditBirthdate = () => {
    setEditableBirthdate(!editableBirthdate);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUser({ ...user, picture: file });
    }
  };

  const handleImageRemove = () => {
    setUser({ ...user, picture: "" });
  };

  return {
    handleChange,
    handleUpdateUser,
    handleEditBirthdate,
    handleImageChange,
    handleImageRemove,
    user,
    editableBirthdate,
  };
};

export default useUpdate;

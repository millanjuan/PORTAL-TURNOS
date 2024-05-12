import { useDispatch } from "react-redux";
import { logOut } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const useMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/signin");
  };
  return { handleLogOut };
};

export default useMenu;

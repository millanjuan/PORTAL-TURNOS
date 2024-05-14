import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Layout from "./components/Layout/Layout";
import SignUp from "./pages/SignUp/SignUp";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import NewAppointment from "./pages/NewAppointment/NewAppointment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forcedSignInAsync } from "./redux/thunks/authThunk";
import { RootState } from "./redux/store/store";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import MyAppointments from "./pages/MyAppointments/MyAppointments";

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const getUserData = async (token: string) => {
    try {
      await dispatch<any>(forcedSignInAsync(token));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    if (
      !token &&
      location.pathname !== "/signup" &&
      location.pathname !== "/signin"
    )
      navigate("/signin");
    if (token && !userData) {
      getUserData(token);
    }
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/new-appointment" element={<NewAppointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/account-settings" element={<AccountSettings />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;

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
import { getUserAppointmentsAsync } from "./redux/thunks/appointmentThunk";
import Restore from "./pages/Restore/Restore";
import NotFound from "./pages/404/NotFound";

const App = () => {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const getUserData = async () => {
    try {
      await dispatch<any>(forcedSignInAsync());
      await dispatch<any>(getUserAppointmentsAsync());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    if (token && expirationTime && new Date() > new Date(expirationTime)) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      navigate("/signin");
    }
    if (
      !token &&
      pathname !== "/signup" &&
      pathname !== "/signin" &&
      pathname !== "/restore"
    )
      navigate("/signin");
    token && !userData && getUserData();
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/restore" element={<Restore />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/new-appointment" element={<NewAppointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;

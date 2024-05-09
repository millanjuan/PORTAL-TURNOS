import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Layout from "./components/Layout/Layout";
import SignUp from "./pages/SignUp/SignUp";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;

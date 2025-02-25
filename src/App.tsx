import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Main from "./Layouts/Main";
import ChatInterface from "./Pages/Chat";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage";
import VeificationPage from "./Pages/VerifyPage";
import ProfilePage from "./Pages/ProfilePage";
import ForgotPassword from "./Pages/ForgetPassword";
import { useEffect } from "react";

function App() {
  const ScrollToSection = () => {
    const location = useLocation();
    useEffect(() => {
      // console.log(location);
      if (location.pathname === "/") {
        const hash = location.hash.substring(1); // Get section ID without '#'
        if (hash) {
          const section = document.getElementById(hash);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else if (location.pathname == "/gallery" && location.hash !== "") {
        window.location = `/${location.hash}` as Location & string;
      }
    }, [location]);

    return null;
  };
  return (
    <BrowserRouter>
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify/:personalToken" element={<VeificationPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

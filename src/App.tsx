import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Main from "./Layouts/Main";
import ChatInterface from "./Pages/Chat";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage";
import VeificationPage from "./Pages/VerifyPage";
import ProfilePage from "./Pages/ProfilePage";
import ForgotPassword from "./Pages/ForgetPassword";
import { useContext, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { AuthContext, AuthContextType } from "./Components/AuthContext";


function App() {
  
  const {isLoggedIn} = useContext(AuthContext) as AuthContextType

  const ScrollToSection = () => {
    const location = useLocation();
    useEffect(() => {
      // console.log(location);
      if (
        location.pathname === "/" &&
        (location.hash.includes("#") || location.hash == "")
      ) {
        const hash = location.hash.substring(1); // Get section ID without '#'
        if (hash) {
          const section = document.getElementById(hash);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else if (location.pathname !== "/" && location.hash.includes("#")) {
        window.location = `/${location.hash}` as Location & string;
      }
    }, [location]);

    return null;
  };
  return (
    <BrowserRouter>
      <ScrollToSection />
      <Navbar isLoggedIn={isLoggedIn}  />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Main /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/verify/:personalToken"
          element={!isLoggedIn ? <VeificationPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <SignupPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/chat"
          element={isLoggedIn ? <ChatInterface /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/forgot-password"
          element={!isLoggedIn ? <ForgotPassword /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

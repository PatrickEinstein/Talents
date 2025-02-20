import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Layouts/Main";
import ChatInterface from "./Pages/Chat";
import Applynow from "./Pages/Applynow";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage";
import VeificationPage from "./Pages/VerifyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify/:personalToken" element={<VeificationPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/apply" element={<Applynow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

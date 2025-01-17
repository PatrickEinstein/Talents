import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Layouts/Main";
import ChatInterface from "./Pages/Chat";
import Applynow from "./Pages/Applynow";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/chat" element={<ChatInterface/>}/>
      <Route path="/apply" element={<Applynow/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;

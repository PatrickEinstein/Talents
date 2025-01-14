import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Layouts/Main";
import { JobDetails } from "./Pages/JobDetails";
import ChatInterface from "./Pages/Chat";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/details" element={<JobDetails/>}/>
      <Route path="/chat" element={<ChatInterface/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Layouts/Main";
import { JobDetails } from "./Pages/JobDetails";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/details" element={<JobDetails/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;

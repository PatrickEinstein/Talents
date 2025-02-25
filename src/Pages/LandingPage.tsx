import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <Hero/>
     
    </div>
  );
};

export default LandingPage;

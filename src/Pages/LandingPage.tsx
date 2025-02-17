import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[92%] bg-gray-100 text-center p-6">
        <h2 className="text-4xl font-bold mb-4">Find Your Dream Job</h2>
        <p className="text-lg text-gray-600 mb-6">
          Browse thousands of job listings and connect with top employers.
        </p>
        <Link
          to="/signup"
          className="bg-blue-500 text-white px-6 py-3 rounded text-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

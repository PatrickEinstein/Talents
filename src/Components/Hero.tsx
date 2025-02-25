import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

const carouselsImages = [
  {
    img: "../../public/img1.jpg",
  },
  {
    img: "../../public/img2.jpg",
  },
  {
    img: "../../public/img3.jpg",
  },
  {
    img: "../../public/img4.jpg",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselsImages.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselsImages.length - 1 : prevIndex - 1
    );
  };
  setInterval(() => {
    handleNext();
  }, 10000);
  return (
    <div
      id="home"
      className="relative flex flex-col items-center justify-center h-screen text-center p-6 bg-gray-100 overflow-hidden"
    >
      {/* Image Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {carouselsImages.map(({ img }, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute top-3/4 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-200 transition"
      >
        <BiChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-3/4 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-200 transition"
      >
        <BiChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Content */}
      <div className="relative z-10 text-white">
        <h2 className="text-4xl font-bold mb-4">Get Connected To Jobs, Services, Products and Goods</h2>
        <p className="text-lg text-gray-200 mb-6">
          Browse thousands of oppurtunities and connect to everything andd everyone you need.
        </p>
        <Link
          to="/signup"
          className="bg-blue-500 text-white px-6 py-3 rounded text-lg transition hover:bg-blue-600"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;

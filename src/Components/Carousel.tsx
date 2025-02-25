import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";


const carouselsImages = [
  {
    img: "/img2.png",
  },
  {
    img: "/img2.png",
  },
  {
    img: "/img3.png",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselsImages.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselsImages.length - 1 : prevIndex - 1
    );
  };

  // setInterval(()=>{
  //   handleNext()
  // }, 10000)

  return (
    <div className="relative mx-auto h-full bg-white">
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img1.jpg')" }}
      /> */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className=" h-full">
          <AnimatePresence>
            {carouselsImages.map(
              ({ img }, index) =>
                index === currentIndex && (
                  <motion.img
                    key={img}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 2.0 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )
            )}
          </AnimatePresence>
        </div>
      </div>
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

export default Carousel;

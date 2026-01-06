import { useEffect, useState } from "react";

const images = [
  "./images/hero1.png",
  "./images/hero2.png",
  "./images/hero3.png",
  "./images/hero4.png",
];
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intevalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intevalId);
  }, []);
  return (
    <div className="w-full px-3 flex flex-col gap-5 md:gap-10 items-center justify-center">
      <div className="w-full xl:w-[80%] flex items-center justify-start border-2 border-[#D4E80D] overflow-x-auto rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full flex-shrink-0"
            />
          ))}
        </div>
      </div>

      <div className="w-full md:p-3">
        <img src="./images/sale.webp" alt="sale" className="rounded-lg" />
      </div>
    </div>
  );
};

export default HeroSection;

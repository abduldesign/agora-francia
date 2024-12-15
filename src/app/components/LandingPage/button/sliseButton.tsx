import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSwiper } from "swiper/react";

export default function SlideButton() {
  const swiper = useSwiper();

  const handleNextSlide = () => {
    swiper.slideNext();
  };

  const handlePrevSlide = () => {
    swiper.slidePrev();
  };

  return (
    <div className="flex flex-row gap-4">
      <FaArrowLeft
        className="hover:cursor-pointer hover:text-[rgb(65,22,147)] transition ease-in-out transform hover:scale-125 delay-100  duration-300"
        onClick={handlePrevSlide}
      />
      <FaArrowRight
        className="hover:cursor-pointer hover:text-[#411693] transition ease-in-out delay-100 transform hover:scale-125 duration-300"
        onClick={handleNextSlide}
      />
    </div>
  );
}

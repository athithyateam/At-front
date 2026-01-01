import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SmallCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    []
  );

  return (
    <div className="relative w-full max-w-[820px] mx-auto rounded-lg overflow-hidden shadow-md">
      
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {images.map((src, idx) => (
          <div key={idx} className="keen-slider__slide">
            <img
              src={src}
              alt={`Slide ${idx}`}
              className="w-full h-[320px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md cursor-pointer"
      >
        <FiChevronLeft size={22} />
      </button>

      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md cursor-pointer"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2.5 h-2.5 rounded-full ${
              currentSlide === idx ? "bg-white" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SmallCarousel;

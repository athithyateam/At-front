import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import img1 from "/images/carousel-img1.png"; 
import img2 from "/images/carousel-img2.png"; 
import img3 from "/images/carousel-img3.png"; 

const images = [img1, img2, img3];

// Simple autoplay plugin for Keen Slider
function Autoplay(slider) {
  let timeout;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 3000);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

const ArrowButton = ({ dir = "left", onClick, disabled }) => (
  <button
    aria-label={dir === "left" ? "Previous slide" : "Next slide"}
    onClick={onClick}
    disabled={disabled}
    className={`absolute top-1/2 -translate-y-1/2 z-20 p-2 rounded-full shadow-md bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition ${
      dir === "left" ? "left-3" : "right-3"
    }`}
  >
    {dir === "left" ? (
      <FiChevronLeft className="h-6 w-6" />
    ) : (
      <FiChevronRight className="h-6 w-6" />
    )}
  </button>
);

const Dots = ({ current, count, onDot }) => (
  <div className="absolute top-84 left-1/2 -translate-x-1/2 z-20 flex gap-2">
    {Array.from({ length: count }).map((_, idx) => (
      <button
        key={idx}
        aria-label={`Go to slide ${idx + 1}`}
        onClick={() => onDot(idx)}
        className={`h-2.5 w-2.5 rounded-full transition ${
          current === idx ? "bg-white" : "bg-white/50 hover:bg-white/80"
        }`}
      />
    ))}
  </div>
);

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      renderMode: "precision",
      drag: true,
    },
    [Autoplay]
  );

  const total = images.length;

  return (
    <div className="relative w-[99vw] mx-auto">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider overflow-hidden">
        {images.map((src, idx) => (
          <div key={idx} className="keen-slider__slide flex items-center justify-center bg-gray-100">
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="block w-full h-[360px] object-cover select-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      {/* <ArrowButton
        dir="left"
        onClick={() => instanceRef.current?.prev()}
        disabled={!instanceRef.current}
      />
      <ArrowButton
        dir="right"
        onClick={() => instanceRef.current?.next()}
        disabled={!instanceRef.current}
      /> */}

      {/* Dots */}
      <Dots
        current={currentSlide}
        count={total}
        onDot={(i) => instanceRef.current?.moveToIdx(i)}
      />
    </div>
  );
};

export default Carousel;

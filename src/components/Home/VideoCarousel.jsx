import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../styles/heroText.css";
import '../../index.css'

const slides = [
  {
    id: 1,
    video:
      "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853369/WhatsApp_Video_2025-11-08_at_15.06.10_40747acb_kpycbi.mp4",
  },
];

export default function VideoCarousel() {
  // Initialize Keen Slider
  const [current, setCurrent] = useState(0);
  const [sliderRef] = useKeenSlider({
    loop: true,
    slidesPerView: 1,
    mode: "snap",
    afterChange: (s) => setCurrent(s.details().relativeSlide),
  });

  // Move to a specific slide when a dot is clicked
  const moveTo = (idx) => {
    setCurrent(idx);
    sliderRef.current.moveToSlide(idx);
  };

  return (
    <section className="relative w-full h-screen">
      <div className="keen-slider h-full" ref={sliderRef}>
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="keen-slider__slide video-slide relative w-full h-screen"
            aria-label={`Slide ${i + 1}`}
          >
            {/* Video */}
            <video
              className="absolute inset-0 w-full h-full object-cover z-0"
              src={s.video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-linear-to-b from-black/50 via-black/30 to-black/80" />

            {/* Hero Text */}
            <div className="relative z-20 flex flex-col justify-center items-center text-center h-full">
              <div
                className={`space-y-4 fade-sequence ${
                  current === i ? "active-slide" : "inactive-slide"
                }`}
              >
                <h2 className="hero-sub text-white/80 text-lg md:text-2xl tracking-wider font-light uppercase">
                  Feel the Experience
                </h2>

                <h1 className="hero-main text-white text-4xl md:text-6xl font-extrabold leading-tight">
                  Coz{" "}
                  <span className="text-gradient-gold italic px-2">
                    “You Only Live Once”
                  </span>
                </h1>

                <p className="hero-tag text-white/70 text-sm md:text-lg tracking-wide max-w-xl mx-auto">
                  where You, Locals & Experiences blend stories.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => moveTo(idx)}
            className={`w-3 h-3 rounded-full transition-transform transform ${
              current === idx
                ? "scale-125 bg-brandGold"
                : "bg-white/50 hover:scale-110"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

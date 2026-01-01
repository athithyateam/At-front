import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronUp,
  FiChevronDown,
  FiHeart,
  FiMessageCircle,
  FiShare2,
} from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

const videos = [
  "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853268/VID-20251108-WA0014_ohtvtr.mp4",
  "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853247/VID-20251108-WA0022_cahvgb.mp4",
  "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853116/Deepak-11_oampjk.mp4",
];

export default function InstagramSection() {
  const [index, setIndex] = useState(0);
  const autoRef = useRef(null);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [index]);

  const startAuto = () => {
    stopAuto();
    autoRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % videos.length);
    }, 6000);
  };

  const stopAuto = () => {
    if (autoRef.current) {
      clearTimeout(autoRef.current);
      autoRef.current = null;
    }
  };

  const prev = () => {
    stopAuto();
    setIndex((i) => (i - 1 + videos.length) % videos.length);
  };

  const next = () => {
    stopAuto();
    setIndex((i) => (i + 1) % videos.length);
  };

  const markers = [
    {
      id: 1,
      top: "30%",
      left: "31.5%",
      img: "https://res.cloudinary.com/dvjqisuve/image/upload/v1762853288/IMG-20251108-WA0038_kcm8vg.jpg",
      link: "https://www.instagram.com/p/DQ_vDbskyUU/?img_index=2",
      size: 250,
    },
    {
      id: 2,
      top: "14.3%",
      left: "73.5%",
      img: "https://res.cloudinary.com/dvjqisuve/image/upload/v1762853138/24b96e84-d874-43e6-8022-3dd5d8ff8052_odf2lg.jpg",
      link: "https://www.instagram.com/p/DQJj4diEpcz/?img_index=6",
      size: 200,
    },
    {
      id: 3,
      top: "85.7%",
      left: "43%",
      img: "https://res.cloudinary.com/dvjqisuve/image/upload/v1762853301/IMG-20251108-WA0029_f93xn9.jpg",
      link: "https://www.instagram.com/p/DQb_GFbEyoV/",
      size: 170,
    },
    {
      id: 4,
      top: "65.6%",
      left: "85%",
      img: "https://res.cloudinary.com/dvjqisuve/image/upload/v1762853151/c5a0b2f2-2382-47d4-98fc-1dd2e3d63051_vpfetu.jpg",
      link: "https://www.instagram.com/p/DRCCxU-kiDS/",
      size: 190,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-6 pb-16">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Connect with us on
        </h2>
        <a
          href="https://www.instagram.com/athithya.in?igsh=OTB2Z21uYmluMXBz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700"
        >
          <FaInstagram className="text-yellow-600" />
          INSTA
        </a>
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* LEFT: Phone */}
        <div className="flex justify-center w-full md:w-2/5">
          <div
            className="relative rounded-[28px] bg-black shadow-xl"
            style={{
              width: "clamp(240px, 70vw, 300px)",
              height: "clamp(460px, 85vw, 580px)",
            }}
            onMouseEnter={stopAuto}
            onMouseLeave={startAuto}
          >
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-2 rounded-full bg-gray-800/60 z-20" />

            {/* Screen */}
            <div className="absolute inset-1.5 rounded-[22px] bg-black overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.video
                  key={index}
                  src={videos[index]}
                  playsInline
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.8, 0.25, 1],
                  }}
                />
              </AnimatePresence>

              {/* up/down buttons */}
              <button
                onClick={prev}
                className="absolute left-2 top-[20%] bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 shadow"
              >
                <FiChevronUp size={14} />
              </button>
              <button
                onClick={next}
                className="absolute left-2 top-[30%] bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 shadow"
              >
                <FiChevronDown size={14} />
              </button>

              {/* social icons */}
              <div className="absolute right-2 bottom-14 flex flex-col gap-2 z-30">
                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                  <FiHeart size={15} className="text-pink-600" />
                </button>
                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                  <FiMessageCircle size={15} />
                </button>
                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                  <FiShare2 size={13} />
                </button>
              </div>

              {/* dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full ${
                      i === index ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Image with markers */}
        <div className="w-full md:w-3/5 flex justify-center">
          <div className="relative w-full max-w-3xl">
            <img
              src="/images/insta-bg.jpg"
              alt="Pointing to Instagram phone"
              className="w-full h-auto max-h-[520px] object-contain"
            />

            {markers.map((m) => (
              <a
                key={m.id}
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: m.top, left: m.left }}
              >
                <div
                  className="rounded-full overflow-hidden border-4 md:border-6 border-[#C59A2F]"
                  style={{
                    width: `clamp(90px, 14vw, ${m.size}px)`,
                    height: `clamp(90px, 14vw, ${m.size}px)`,
                  }}
                >
                  <img
                    src={m.img}
                    alt={`marker-${m.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

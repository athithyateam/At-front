/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, useTransform } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import AuthSection from "../auth/AuthSection";
import "../../App.css";

const SECTIONS = [
  {
    title: "Local Experience",
    subtitle: "Because hotels never say, \"Let's go to my favourite place.\"",
    highlight: "locals do.",
  },
  {
    title: "Connect & Share Stories",
    subtitle: "Because the best plans are never planned - we just get inspired by someone else's story.",
    highlight: "share and get inspired with genuine travel stories and moments.",
  },
  {
    title: "Join a Plan",
    subtitle: "Ever wondered what it feels like to join a plan with people who share the same interests as you?",
    highlight: "you just do it.",
  },
];

export default function LeftContent({ scrollYProgress }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  const step = 1 / SECTIONS.length;

  const handleExplore = () => {
    if (user) {
      navigate("/explore");
    } else {
      setShowAuth(true);
    }
  };

  return (
    <>
      <div className="relative h-[45vh] md:h-[60vh] flex items-center w-full">
        {SECTIONS.map((item, i) => {
          const start = i * step;

          const fadeInStart = start + step * 0.1;
          const fadeInEnd = start + step * 0.25;
          const fadeOutStart = start + step * 0.75;
          const fadeOutEnd = start + step * 0.9;

          const opacity = useTransform(
            scrollYProgress,
            i === 0
              ? [0, fadeOutStart, fadeOutEnd]
              : i === SECTIONS.length - 1
                ? [fadeInStart, 1]
                : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
            i === 0
              ? [1, i === SECTIONS.length - 1 ? 1 : 1, 0]
              : i === SECTIONS.length - 1
                ? [0, 1]
                : [0, 1, 1, 0]
          );

          const y = useTransform(
            scrollYProgress,
            i === 0
              ? [0, fadeOutStart, fadeOutEnd]
              : i === SECTIONS.length - 1
                ? [fadeInStart, fadeInEnd, 1]
                : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
            i === 0
              ? [0, 0, -50]
              : i === SECTIONS.length - 1
                ? [50, 0, 0]
                : [50, 0, 0, -50]
          );

          return (
            <motion.div
              key={i}
              style={{ opacity, y }}
              className="absolute inset-0 flex flex-col justify-center text-gray-900 px-1 md:px-0"
            >
              {/* Step indicator */}
              <div className="flex items-center gap-3 md:gap-5 mb-4 md:mb-10 font-serif">
                <div className="w-1.5 h-12 md:h-16 bg-[#C59A2F] rounded-full" />
                <span className="flex items-center gap-2 md:gap-3 text-[#C59A2F]">
                  <span className="text-base md:text-xl font-bold uppercase tracking-[0.3em]">Step</span>
                  <span className="text-5xl md:text-7xl font-black tabular-nums leading-none">
                    {i + 1}
                  </span>
                </span>
              </div>

              {/* Headline */}
              <motion.h2
                className="
                story-title
                text-3xl md:text-6xl
                font-extrabold
                leading-[1.1]
                max-w-full
                md:max-w-[550px]
                text-left
                text-black
              "
              >
                {item.title}
              </motion.h2>

              {/* Subline container */}
              <div className="mt-4 md:mt-8 space-y-3 md:space-y-6">
                <motion.p
                  className="
                    text-base md:text-2xl
                    text-gray-800
                    max-w-full
                    md:max-w-[500px]
                    text-left
                    leading-relaxed
                  "
                >
                  {item.subtitle}
                </motion.p>

                <motion.p
                  className="
                    text-base md:text-2xl
                    font-semibold
                    text-gray-900
                    max-w-full
                    md:max-w-[520px]
                    text-left
                    leading-snug
                  "
                >
                  At <span className="text-[#C59A2F] font-bold">Athithya</span>, {item.highlight}
                </motion.p>
              </div>

              <div className="mt-6 md:mt-12 pointer-events-auto flex justify-start">
                <button
                  onClick={handleExplore}
                  className="
                      px-8 py-3 md:px-12 md:py-4 
                      bg-[#C59A2F] text-white 
                      rounded-full font-bold
                      text-base md:text-xl
                      shadow-xl hover:bg-[#b0892a] 
                      transform transition-all active:scale-95
                    "
                >
                  Explore
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Auth Modal Portal */}
      {showAuth &&
        createPortal(
          <AuthSection onClose={() => setShowAuth(false)} />,
          document.body
        )}
    </>
  );
}

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
      <div className="relative h-[40vh] md:h-[60vh] flex items-center">
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
              ? [1, 1, 0]
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
              className="absolute left-0 right-0 text-gray-900"
            >
              {/* Step indicator */}
              <div className="flex items-center gap-4 mb-4 md:mb-8 font-serif">
                <div className="w-1.5 h-10 md:h-12 bg-[#C59A2F] rounded-full" />
                <span className="text-xl md:text-4xl font-bold uppercase tracking-widest text-[#C59A2F]">
                  Step {i + 1}
                </span>
              </div>

              {/* Headline */}
              <motion.h2
                className="
                story-title
                text-3xl md:text-6xl
                font-bold
                leading-tight
                max-w-[520px]
                text-left
                text-black
              "
              >
                {item.title}
              </motion.h2>

              {/* Subline container */}
              <div className="mt-4 md:mt-8 space-y-4 md:space-y-6">
                <motion.p
                  className="
                    text-base md:text-2xl
                    text-gray-800
                    max-w-[500px]
                    text-left
                    leading-relaxed
                  "
                >
                  {item.subtitle}
                </motion.p>

                <motion.p
                  className="
                    text-base md:text-2xl
                    font-medium
                    text-gray-900
                    max-w-[520px]
                    text-left
                  "
                >
                  At <span className="text-[#C59A2F] font-bold">Athithya</span>, {item.highlight}
                </motion.p>
              </div>

              <div className="mt-8 md:mt-12 pointer-events-auto flex justify-start">
                <button
                  onClick={handleExplore}
                  className="
                      px-8 py-3 md:px-12 md:py-4 
                      bg-[#C59A2F] text-white 
                      rounded-full font-bold
                      text-lg
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

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
    subtitle: "Because hotels never say, “Let's go to my favourite place.” On Athithya, locals do.",
  },
  {
    title: "Connect & Share Stories",
    subtitle: "Because the best plans are never planned — we just get inspired by someone else’s story. At Athithya, share and get inspired with genuine travel stories & moments.",
  },
  {
    title: "Join a Plan",
    subtitle: "Ever wondered what it feels like to join a plan with people who share the same interests as you? At Athithya, you just do it.",
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
      <div className="relative h-[50vh] md:h-[60vh] flex items-center">
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

          const isLast = i === SECTIONS.length - 1;

          return (
            <motion.div
              key={i}
              style={{ opacity }}
              className={`absolute left-0 right-0 ${isLast ? "text-neutral-800" : "text-neutral-600"
                }`}
            >
              {/* Step indicator */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-0.5 h-8 bg-[#C59A2F]/80 rounded-full" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C59A2F]/80">
                  Step {i + 1}
                </span>
              </div>

              {/* Headline */}
              <motion.h2
                className="
                story-title
                text-3xl md:text-5xl
                font-semibold
                leading-tight
                max-w-[520px]
                text-left
              "
              >
                {item.title}
              </motion.h2>

              {/* Subline */}
              <motion.p
                className="
                story-sub
                mt-5
                text-base md:text-lg
                max-w-[500px]
                text-justify
              "
              >
                {item.subtitle}
              </motion.p>

              <div className="mt-8 pointer-events-auto flex justify-start">
                <button
                  onClick={handleExplore}
                  className="
                      px-8 py-3 
                      bg-[#C59A2F] text-white 
                      rounded-full font-medium 
                      shadow-lg hover:bg-[#b0892a] 
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

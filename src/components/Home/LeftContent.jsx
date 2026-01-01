/* eslint-disable react-hooks/rules-of-hooks */
import { motion, useTransform } from "framer-motion";
import "../../App.css";

const SECTIONS = [
  {
    title: "Travel isn’t about places",
    subtitle: "It’s about the moments that quietly stay with you.",
  },
  {
    title: "Most travel stories are performed",
    subtitle: "Athithya exists for the ones that are simply lived.",
  },
  {
    title: "Journeys are shaped by people",
    subtitle: "Locals, hosts, and fellow travelers change everything.",
  },
  {
    title: "You don’t need to perform here",
    subtitle: "Just share what you experienced — honestly.",
  },
];

export default function LeftContent({ scrollYProgress }) {
  const step = 1 / SECTIONS.length;

  return (
    <div className="relative h-[60vh] flex items-center">
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
            className={`absolute left-0 right-0 ${
              isLast ? "text-neutral-800" : "text-neutral-600"
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
              "
            >
              {item.subtitle}
            </motion.p>
          </motion.div>
        );
      })}
    </div>
  );
}

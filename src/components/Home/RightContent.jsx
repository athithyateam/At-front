/* eslint-disable react-hooks/rules-of-hooks */
import { motion, useTransform } from "framer-motion";

const IMAGES = [
  "/images/travel-1.jpg",
  "/images/travel-2.jpg",
  "/images/travel-3.jpg",
];

export default function RightContent({ scrollYProgress }) {
  const step = 1 / IMAGES.length;

  return (
    <div className="relative h-[35vh] md:h-[60vh] w-full rounded-2xl md:rounded-3xl overflow-hidden cinematic-grain">
      {IMAGES.map((src, i) => {
        const start = i * step;

        const fadeInStart = start + step * 0.1;
        const fadeInEnd = start + step * 0.25;
        const fadeOutStart = start + step * 0.75;
        const fadeOutEnd = start + step * 0.9;

        const opacity = useTransform(
          scrollYProgress,
          i === 0
            ? [0, fadeOutStart, fadeOutEnd]
            : i === IMAGES.length - 1
              ? [fadeInStart, 1]
              : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
          i === 0
            ? [1, 1, 0]
            : i === IMAGES.length - 1
              ? [0, 1]
              : [0, 1, 1, 0]
        );

        // Slide Up Animation (Syncs with Text)
        const y = useTransform(
          scrollYProgress,
          i === 0
            ? [0, fadeOutStart, fadeOutEnd]
            : i === IMAGES.length - 1
              ? [fadeInStart, fadeInEnd, 1]
              : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
          i === 0
            ? [0, 0, -50]
            : i === IMAGES.length - 1
              ? [50, 0, 0]
              : [50, 0, 0, -50]
        );

        return (
          <motion.img
            key={i}
            src={src}
            alt=""
            style={{ opacity, y }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        );
      })}

      {/* Warm cinematic wash */}
      <div className="absolute inset-0 bg-[#2b2418]/15 pointer-events-none" />

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

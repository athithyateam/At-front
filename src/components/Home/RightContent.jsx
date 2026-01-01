/* eslint-disable react-hooks/rules-of-hooks */
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const IMAGES = [
  "/images/travel-1.jpg",
  "/images/travel-2.jpg",
  "/images/travel-3.jpg",
  "/images/travel-4.jpg",
];

export default function RightContent({ scrollYProgress }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = IMAGES.length;

  // 🔒 Convert scroll progress → step index (0,1,2,3)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      total - 1,
      Math.floor(latest * total)
    );
    setActiveIndex(index);
  });

  // Only animate scale of the ACTIVE image
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <div className="relative h-[45vh] md:h-[60vh] rounded-3xl overflow-hidden cinematic-grain">
      {IMAGES.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt=""
          style={{
            scale: i === activeIndex ? scale : 1,
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}

      {/* Warm cinematic wash */}
      <div className="absolute inset-0 bg-[#2b2418]/15 pointer-events-none" />

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

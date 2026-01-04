/* eslint-disable react-hooks/rules-of-hooks */
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const VIDEOS = [
  {
    video: "https://res.cloudinary.com/dvjqisuve/video/upload/v1767497980/a159c43ce816806e758985ece0546fc6_720w_zxg8gd.mp4",
    poster: "https://res.cloudinary.com/dvjqisuve/video/upload/q_auto/v1767497980/a159c43ce816806e758985ece0546fc6_720w_zxg8gd.jpg"
  },
  {
    video: "https://res.cloudinary.com/dvjqisuve/video/upload/v1767497979/ffea636683072c54ae0b9817d30c46f9_720w_isxo68.mp4",
    poster: "https://res.cloudinary.com/dvjqisuve/video/upload/q_auto/v1767497979/ffea636683072c54ae0b9817d30c46f9_720w_isxo68.jpg"
  },
  {
    video: "https://res.cloudinary.com/dvjqisuve/video/upload/v1767497981/b61f8b20c8f07597a68cc97ee3561ea4_bhr41w.mp4",
    poster: "https://res.cloudinary.com/dvjqisuve/video/upload/q_auto/v1767497981/b61f8b20c8f07597a68cc97ee3561ea4_bhr41w.jpg"
  }
];

export default function RightContent({ scrollYProgress }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);
  const total = VIDEOS.length;

  // 🔒 Convert scroll progress → step index (0,1,2,3)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      total - 1,
      Math.floor(latest * total)
    );
    setActiveIndex(index);
  });

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  // Only animate scale of the ACTIVE image
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <div className="relative h-[35vh] md:h-[60vh] w-full rounded-2xl md:rounded-3xl overflow-hidden cinematic-grain pointer-events-none">
      {VIDEOS.map((item, i) => (
        <motion.video
          key={i}
          ref={el => videoRefs.current[i] = el}
          src={item.video}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="none"
          style={{
            scale: i === activeIndex ? scale : 1,
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${i === activeIndex ? "opacity-100 visible" : "opacity-0 invisible"
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

import React, { useState } from "react";
import { motion } from "framer-motion";

// ===== Animation Variants =====
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.45, 0, 0.25, 1] },
  },
};

// description variants (used by Framer)
const descVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.45, 0, 0.25, 1] },
  },
};

export default function AboutOfferings() {
  const cards = [
    {
      title: "Adikelash Trek",
      video: "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853342/WhatsApp_Video_2025-11-08_at_21.16.56_89b4726e_k9pcp4.mp4",
      color: "text-orange-500",
      desc: "A refreshing balance of comfort and minimalism for the modern traveler.",
      offset: "-translate-y-12",
    },
    {
      title: "Tungnath Trek",
      video: "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853340/WhatsApp_Video_2025-11-08_at_21.16.53_35c454af_bbwms7.mp4",
      color: "text-orange-500",
      desc: "Designed to energize your stay with dynamic colors and playful vibes.",
      offset: "translate-y-4",
    },
    {
      title: "Supin Trek",
      video: "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853276/VID-20251108-WA0008_pgfzn3.mp4",
      color: "text-pink-600",
      desc: "The trek offers stunning views of these snow-covered mountains, dense forests, and alpine meadows, along with an immersion into local Garhwali culture.",
      offset: "-translate-y-12",
    },
    {
      title: "Intuitive and High Energy",
      video: "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853256/VID-20251108-WA0017_nyy65a.mp4",
      color: "text-pink-600",
      desc: "Our team’s warmth and energy ensure every stay feels effortless and memorable.",
      offset: "translate-y-4",
    },
    {
      title: "Thoughtful Amenities",
      video: "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853257/VID-20251108-WA0011_dzj9vv.mp4",
      color: "text-orange-500",
      desc: "Smart features and heartfelt touches crafted for your comfort and ease.",
      offset: "-translate-y-12",
    },
  ];

  // ---- Card subcomponent (local) ----
  function Card({ card, index }) {
    const [hovered, setHovered] = useState(false);

    return (
      <motion.div
        key={index}
        variants={cardVariants}
        className={`flex flex-col items-center text-center cursor-pointer ${card.offset}`}
        // entrance handled by variants; hover handled by handlers below
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {/* ====== Video Card ====== */}
        <motion.div
          className="relative w-52 h-64 overflow-hidden shadow-lg"
          initial={{ borderRadius: "50%" }}
          whileHover={{
            borderRadius: "12px",
          }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <video
            src={card.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ====== Title ====== */}
        <motion.h3
          className={`mt-4 text-lg font-semibold ${card.color}`}
          // small lift on hover for title
          animate={hovered ? { y: -2 } : { y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {card.title}
        </motion.h3>

        {/* ====== Description (Framer-driven) ====== */}
        <motion.div
          // remove group-hover css; use Framer instead
          variants={descVariants}
          animate={hovered ? "visible" : "hidden"}
          className="text-sm text-gray-700 max-w-[220px] mt-2 leading-relaxed"
        >
          <div
            className={`w-2 h-2 ${
              card.color.includes("pink") ? "bg-pink-600" : "bg-orange-500"
            } rounded-full mx-auto mb-2`}
          ></div>
          {card.desc}
        </motion.div>
      </motion.div>
    );
  }

  // ---- main render ----
  return (
    <div className="bg-white text-center pt-14 px-6 pb-6">
      {/* ====== About Section ====== */}
      <section className="max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a1d4d] mb-6">
          Curious About Athithya?
        </h2>
        <p className="text-lg italic text-[#8b5e3c] leading-relaxed">
          “At its core, Athithya is a travel experience platform that seamlessly
          combines the warmth of local hosting with the interactivity of social
          media, offering travel enthusiasts like you a complete, meaningful and
          immersive traveling experience.”
        </p>
      </section>

      {/* ====== Offerings Section (staggered) ====== */}
      <motion.section
        className="max-w-8xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {cards.map((card, i) => (
            <Card key={i} card={card} index={i} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}

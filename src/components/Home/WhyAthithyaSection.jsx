import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STATEMENTS = [
  {
    kicker: "NOT INSTAGRAM TRAVEL",
    title: "Moments that stay",
    text: "Not captured for likes — remembered for life.",
  },
  {
    kicker: "NOT TRAVEL AGENTS",
    title: "People, not profiles",
    text: "You speak to real hosts, not listings or brokers.",
  },
  {
    kicker: "NOT TEMPLATE TRIPS",
    title: "Journeys with context",
    text: "Shaped by lived experience, not copied itineraries.",
  },
];

export default function WhyAthithyaSection() {
  const wrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Background moves slowly → illusion of depth
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);

  return (
    /* OUTER SCROLL AREA */
    <div ref={wrapperRef} className="relative h-[360vh] pb-12">
      {/* FIXED VIEWPORT */}
      <section className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src="/images/travel-5.jpg"
            alt=""
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/35 to-black/55" />
        </motion.div>

        {/* Text */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="relative w-full max-w-4xl text-center text-white">
            {STATEMENTS.map((item, i) => {
              const start = i / STATEMENTS.length;
              const mid = start + 0.15;
              const end = (i + 1) / STATEMENTS.length;

              const opacity = useTransform(
                scrollYProgress,
                [start, mid, end],
                [0, 0.85, 0]
              );

              const x = useTransform(
                scrollYProgress,
                [start, mid, end],
                [40, 0, -20]
              );

              const y = useTransform(
                scrollYProgress,
                [start, mid, end],
                [30, 0, -10]
              );

              return (
                <motion.div
                  key={i}
                  style={{ opacity, x, y }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-[#E6C26E]">
                    {item.kicker}
                  </p>

                  <h2 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                    {item.title}
                  </h2>

                  <p className="mt-5 text-[1.05rem] text-neutral-200/90 max-w-xl">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

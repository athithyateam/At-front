import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const GOLD = "#C59A2F";

const Stars = ({ rating = 4.5 }) => {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <div className="flex items-center gap-1 text-xs" style={{ color: GOLD }}>
      {[...Array(full)].map((_, i) => (
        <FaStar key={`f${i}`} />
      ))}
      {hasHalf && <FaStarHalfAlt />}
      {[...Array(empty)].map((_, i) => (
        <FaRegStar key={`e${i}`} />
      ))}
    </div>
  );
};

const ForYouCard = ({
  title = "Santorini Villa",
  description = "Luxury villa overlooking the Aegean Sea, offering breathtaking sunset views and a private infinity pool for ultimate relaxation.",
  image = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  rating = 4.5,
  nights = 3,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="
        relative w-[330px] h-[420px] rounded-3xl overflow-hidden
        bg-white shadow-md shrink-0
        ring-1 ring-gray-100
      "
    >
      {/* IMAGE BLOCK: top half sharp, bottom half blurred */}
      <div className="relative w-full h-full">
        {/* Blurred base (full) */}
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "blur(2px) saturate(115%) brightness(70%)",
            transform: "scale(1.06)",
          }}
        />
        {/* Sharp overlay shown on TOP half with soft fade */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 60%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 60%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.18), rgba(0,0,0,0))",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-gray-900">
        <h2 className="text-xl font-semibold mb-1" style={{ color: GOLD }}>
          {title}
        </h2>
        <p className="text-sm leading-snug text-white">{description}</p>

        <div className="mt-3 flex items-center gap-2 text-[12px]">
          <div className="flex items-center gap-2 bg-white/70 px-3 py-1 rounded-full border border-gray-200">
            <span className="font-semibold" style={{ color: GOLD }}>
              {Number(rating).toFixed(1)}
            </span>
            <Stars rating={Number(rating)} />
          </div>
          <span className="bg-white/70 px-3 py-1 rounded-full border border-gray-200 text-gray-700">
            {nights} Night Stay
          </span>
        </div>

        <button
          onClick={onClick}
          className="mt-4 w-full rounded-full bg-[#C59A2F] text-white py-3 text-sm font-semibold
             hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.08),0_10px_26px_rgba(0,0,0,0.22)]
             transition cursor-pointer"
        >
          Reserve now
        </button>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-3xl ring-0 group-hover:ring-2"
        style={{ borderColor: GOLD }}
      />
    </motion.div>
  );
};

export default ForYouCard;

// src/components/layout/CarouselRow.jsx
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CarouselRow = ({
  title,
  subtitle,
  actionLabel,
  actionTo,
  onAction,
  backgroundClass = "bg-white",
  children,
}) => {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    const amount = 320;
    rowRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={`${backgroundClass} py-10 px-4 md:px-12`}>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#C59A2F] italic text-left">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-gray-600 mt-1 text-left">
              {subtitle}
            </p>
          )}
        </div>

        {/* ACTION */}
        {(actionLabel || actionTo) && (
          <div className="shrink-0 mb-1">
            {actionTo ? (
              <Link
                to={actionTo}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#C59A2F]/30 text-[#C59A2F] hover:bg-[#C59A2F] hover:text-white transition-all duration-300"
                title={actionLabel || "View all"}
              >
                <FaArrowRightLong size={18} />
              </Link>
            ) : (
              <button
                onClick={onAction}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#C59A2F]/30 text-[#C59A2F] hover:bg-[#C59A2F] hover:text-white transition-all duration-300"
                title={actionLabel || "View all"}
              >
                <FaArrowRightLong size={18} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        {/* LEFT */}
        <button
          onClick={() => scrollRow("left")}
          className="hidden md:flex items-center justify-center absolute -left-3 top-1/2 -translate-y-1/2
                     bg-white/90 backdrop-blur-sm border border-yellow-400 text-yellow-600
                     p-3 rounded-full shadow-md hover:bg-yellow-50 transition z-10"
        >
          <FaChevronLeft size={18} />
        </button>

        {/* RIGHT */}
        <button
          onClick={() => scrollRow("right")}
          className="hidden md:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2
                     bg-white/90 backdrop-blur-sm border border-yellow-400 text-yellow-600
                     p-3 rounded-full shadow-md hover:bg-yellow-50 transition z-10"
        >
          <FaChevronRight size={18} />
        </button>

        {/* ROW */}
        <div
          ref={rowRef}
          className="flex gap-5 overflow-x-auto overflow-y-visible scroll-smooth pt-2 pb-6 scrollbar-hide"
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default CarouselRow;

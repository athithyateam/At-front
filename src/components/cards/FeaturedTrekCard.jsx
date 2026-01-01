// src/components/cards/FeaturedTrekCard.jsx
import { motion } from "framer-motion";

const FeaturedTrekCard = ({ image, title, days, level, price, location }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-72 bg-white rounded-2xl overflow-hidden shadow-md shrink-0 cursor-pointer border border-yellow-100"
    >
      <div className="relative h-40">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {days}
        </div>
        <div className="absolute top-2 right-2 bg-white/90 text-xs px-2 py-1 rounded-full text-gray-800">
          {level}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-500">{location}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[#C59A2F] font-semibold">{price}</p>
          <span className="text-xs text-gray-500">per person</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedTrekCard;

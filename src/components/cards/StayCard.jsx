// src/components/cards/StayCard.jsx
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const StayCard = ({ image, title, location, price, rating }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-72 bg-white rounded-2xl overflow-hidden shadow-md shrink-0 cursor-pointer border border-gray-100"
    >
      <div className="relative h-40">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <FaStar size={10} className="text-yellow-300" />
          <span>{rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{location}</p>
        <p className="text-sm font-semibold text-[#C59A2F]">{price}</p>
      </div>
    </motion.div>
  );
};

export default StayCard;

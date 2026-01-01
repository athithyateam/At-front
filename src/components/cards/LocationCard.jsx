// src/components/cards/LocationCard.jsx
import { motion } from "framer-motion";

const LocationCard = ({ image, city, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="relative w-56 md:w-60 h-40 md:h-44 rounded-2xl overflow-hidden shadow-lg cursor-pointer shrink-0"
    >
      <img src={image} alt={city} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent" />
      <p className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-lg">
        {city}
      </p>
    </motion.div>
  );
};

export default LocationCard;

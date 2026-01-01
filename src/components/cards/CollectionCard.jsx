// src/components/cards/CollectionCard.jsx
import { motion } from "framer-motion";

const CollectionCard = ({ image, title, count }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative w-64 h-40 rounded-2xl overflow-hidden shrink-0 cursor-pointer shadow-md"
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-3 left-3">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-xs text-gray-200">{count}</p>
      </div>
    </motion.div>
  );
};

export default CollectionCard;

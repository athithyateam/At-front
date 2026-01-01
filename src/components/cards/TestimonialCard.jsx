// src/components/cards/TestimonialCard.jsx
import { motion } from "framer-motion";

const TestimonialCard = ({ image, name, trip, text }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-80 bg-white rounded-2xl overflow-hidden shadow-md shrink-0 border border-gray-100"
    >
      <div className="h-32 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <p className="text-sm text-gray-700 line-clamp-3">“{text}”</p>
        <div className="mt-1">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{trip}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;

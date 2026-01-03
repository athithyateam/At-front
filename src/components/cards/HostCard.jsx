// src/components/cards/HostCard.jsx
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const HostCard = ({ image, name, role, location, tripsHosted, rating }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-72 bg-white rounded-2xl overflow-hidden shadow-md shrink-0 border border-yellow-100 cursor-pointer"
    >
      <div className="h-40 overflow-hidden bg-[#C59A2F]/5 flex items-center justify-center relative">
        {image && !image.includes("missing-image") ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-[#C59A2F]/20 to-[#C59A2F]/10">
            <span className="text-4xl font-black text-[#6B5520]/30 uppercase tracking-tighter">
              {name?.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center text-xs text-gray-700 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded-full gap-1">
            <FaStar className="text-yellow-400" size={10} />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-xs text-[#C59A2F]">{role}</p>
        <p className="text-xs text-gray-500">{location}</p>
        <p className="text-xs text-gray-600 mt-1">
          {tripsHosted}+ trips hosted
        </p>
      </div>
    </motion.div>
  );
};

export default HostCard;

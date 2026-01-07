// src/components/forms/TravellerForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import TravellerPostForm from "./TravellerPostForm";
import TravellerPlanForm from "./TravellerPlanForm";
import HostServiceForm from "./HostServiceForm";

export default function TravellerForm({ editId, editType }) {
  const [type, setType] = useState(editType || "service"); // service | post | plan

  return (
    <div className="mx-auto p-4 md:p-6 bg-[#fffdf8] rounded-2xl soft-border soft-shadow mt-10">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold GOLD">
          {editId ? 'Edit' : 'Create'} Travel Listing
        </h2>
        <p className="text-sm muted mt-1">
          {editId ? 'Update your' : 'Choose what you want to create'}
        </p>
      </div>

      {/* Luxury Switch */}
      {!editId && (
        <div className="flex justify-center md:justify-start">
          <div className="relative inline-flex bg-white rounded-full p-1 soft-border mb-8 w-full max-w-md md:w-auto">
            {/* Animated Indicator */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-1 bottom-1 rounded-full GOLD-bg flex"
              style={{
                width: "32%",
                left: type === "service" ? "1%" : type === "post" ? "34%" : "67%",
              }}
            />

            <button
              onClick={() => setType("service")}
              className={`relative z-10 flex-1 px-4 md:px-6 py-2 text-sm font-medium rounded-full transition text-center ${type === "service" ? "text-white" : "text-gray-600"
                }`}
            >
              Experience
            </button>

            <button
              onClick={() => setType("post")}
              className={`relative z-10 flex-1 px-4 md:px-6 py-2 text-sm font-medium rounded-full transition text-center ${type === "post" ? "text-white" : "text-gray-600"
                }`}
            >
              Momentos
            </button>

            <button
              onClick={() => setType("plan")}
              className={`relative z-10 flex-1 px-4 md:px-6 py-2 text-sm font-medium rounded-full transition text-center ${type === "plan" ? "text-white" : "text-gray-600"
                }`}
            >
              Plans
            </button>
          </div>
        </div>
      )}

      {/* Form Container */}
      <motion.div
        key={type}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {type === "service" && <HostServiceForm editId={editId} />}
        {type === "post" && <TravellerPostForm editId={editId} />}
        {type === "plan" && <TravellerPlanForm editId={editId} />}
      </motion.div>
    </div>
  );
}

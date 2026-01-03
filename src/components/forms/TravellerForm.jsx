// src/components/forms/TravellerForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import TravellerPostForm from "./TravellerPostForm";
import TravellerPlanForm from "./TravellerPlanForm";

export default function TravellerForm({ editId, editType }) {
  const [type, setType] = useState(editType || "post"); // post | plan

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
        <div className="relative inline-flex bg-white rounded-full p-1 soft-border mb-8">
          {/* Animated Indicator */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-1 bottom-1 rounded-full GOLD-bg flex"
            style={{
              width: "50%",
              left: type === "post" ? "2%" : "48%",
            }}
          />

          <button
            onClick={() => setType("post")}
            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition ${type === "post" ? "text-white" : "text-gray-600"
              }`}
          >
            Create Momentos
          </button>

          <button
            onClick={() => setType("plan")}
            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition ${type === "plan" ? "text-white" : "text-gray-600"
              }`}
          >
            Create Plans
          </button>
        </div>
      )}

      {/* Form Container */}
      <motion.div
        key={type}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {type === "post" ? <TravellerPostForm editId={editId} /> : <TravellerPlanForm editId={editId} />}
      </motion.div>
    </div>
  );
}

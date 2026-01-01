// src/components/host/HostForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import TravellerPostForm from "../forms/TravellerPostForm";
import HostPlanForm from "../forms/HostPlanForm"; 
import HostServiceForm from "./HostServiceForm"; 

export default function HostForm() {
  const [type, setType] = useState("post"); // post | plan | service

  return (
    <div className="mx-auto p-6 bg-[#fffdf8] rounded-2xl soft-border soft-shadow mt-10">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold GOLD">Host Dashboard</h2>
        <p className="text-sm muted mt-1">Create a Momento, Plan (Trek) or Service</p>
      </div>

      {/* Segment control */}
      <div className="relative inline-flex bg-white rounded-full p-1 soft-border mb-8">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-1 bottom-1 rounded-full GOLD-bg"
          style={{
            width: "33.3333%",
            left: type === "post" ? "2%" : type === "plan" ? "31.3333%" : "64.6666%",
          }}
        />

        <button
          onClick={() => setType("post")}
          className={`relative z-10 px-6 md:px-8 py-2 text-sm font-medium rounded-full transition ${
            type === "post" ? "text-white" : "text-gray-600"
          }`}
        >
          Post
        </button>

        <button
          onClick={() => setType("plan")}
          className={`relative z-10 px-4 md:px-6 py-2 text-sm font-medium rounded-full transition ${
            type === "plan" ? "text-white" : "text-gray-600"
          }`}
        >
          Plan
        </button>

        <button
          onClick={() => setType("service")}
          className={`relative z-10 px-4 md:px-6 py-2 text-sm font-medium rounded-full transition ${
            type === "service" ? "text-white" : "text-gray-600"
          }`}
        >
          Service
        </button>
      </div>

      {/* Form container */}
      <motion.div
        key={type}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
      >
        {type === "post" && <TravellerPostForm />}
        {type === "plan" && <HostPlanForm />}
        {type === "service" && <HostServiceForm />}
      </motion.div>
    </div>
  );
}

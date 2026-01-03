// src/pages/PostForm.jsx
import React, { useEffect, useState } from "react";
import HostForm from "../components/forms/HostForm";
import TravellerForm from "../components/forms/TravellerForm";

export default function PostForm() {
  const [role, setRole] = useState(null); // "host" | "guest"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // read role from localStorage
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      const normalized = storedRole.toLowerCase();
      if (normalized.includes("host")) setRole("host");
      else if (normalized.includes("guest")) setRole("guest");
    }
    setLoading(false);
  }, []);

  return (
    <div className="mx-0 md:mx-8 p-4 pt-12 mb-20 md:mb-0">
      <div className="flex items-center justify-between mb-4"></div>

      {loading ? (
        <div className="p-4 border border-gray-300 rounded text-center">Loading…</div>
      ) : role === "host" ? (
        <HostForm />
      ) : role === "guest" ? (
        <TravellerForm />
      ) : (
        <div className="p-6 border rounded bg-white shadow-sm flex flex-col items-center">
          <p className="text-gray-700 font-semibold">No role found in localStorage.</p>
          <p className="text-sm text-gray-500 mt-2">
            Save a role to localStorage to continue:
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                localStorage.setItem("role", "host");
                setRole("host");
              }}
              className="px-6 py-2 bg-[#C59A2F] text-white rounded-full font-medium transition hover:scale-105"
            >
              Set as Host
            </button>

            <button
              onClick={() => {
                localStorage.setItem("role", "guest");
                setRole("guest");
              }}
              className="px-6 py-2 bg-gray-800 text-white rounded-full font-medium transition hover:scale-105"
            >
              Set as Traveller
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

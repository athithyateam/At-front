// src/components/PostForm.jsx
import React, { useEffect, useState } from "react";
import HostForm from "../components/forms/HostForm";
import TravellerForm from "../components/forms/TravellerForm";
export default function PostForm() {
  const [role, setRole] = useState(null); // "host" | "traveller"
  const [devOverride, setDevOverride] = useState(null); // optional preview override
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

  const effectiveRole = devOverride || role;

  return (
    <div className="mx-8 p-4 pt-12">
      <div className="flex items-center justify-between mb-4"></div>

      {loading ? (
        <div className="p-4 border border-gray-300 rounded text-center">Loading…</div>
      ) : effectiveRole === "host" ? (
        <HostForm />
      ) : effectiveRole === "guest" ? (
        <TravellerForm />
      ) : (
        <div className="p-6 border rounded">
          <p className="text-gray-700">No role found in localStorage.</p>
          <p className="text-sm text-gray-500 mt-2">
            Save a role to localStorage to continue:
          </p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => {
                localStorage.setItem("role", "host");
                setRole("host");
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Set as Host
            </button>

            <button
              onClick={() => {
                localStorage.setItem("role", "guest");
                setRole("guest");
              }}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Set as Traveller
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

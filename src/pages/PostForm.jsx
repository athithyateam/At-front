// src/pages/PostForm.jsx
import React, { useEffect } from "react";
import HostForm from "../components/forms/HostForm";
import TravellerForm from "../components/forms/TravellerForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PostForm() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If we're done loading and still no user, we might want to stay here
    // but show a "Login" prompt instead of redirecting immediately 
    // to give a better UX.
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C59A2F]"></div>
        <p className="mt-4 text-gray-500 font-medium">Verifying your role...</p>
      </div>
    );
  }

  // If not logged in, show a professional placeholder
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to create posts or offerings.</p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-[#C59A2F] text-white rounded-full font-semibold hover:opacity-90 transition shadow-lg"
          >
            Go to Home to Login
          </button>
        </div>
      </div>
    );
  }

  // Automatic Role Detection from Database
  const rawRole = (user.role || "guest").toLowerCase();
  const isHost = rawRole === "host" || rawRole === "admin";

  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const editType = searchParams.get("type");

  return (
    <div className="mx-0 p-0 md:p-4 mb-20 md:mb-0">
      <div className="max-w-4xl mx-auto">
        {/* Role Indicator (Optional but helpful for testing) */}
        <div className="flex justify-end px-4 mt-2">
          <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-400">
            Mode: {isHost ? 'Host' : 'Guest'} {editId ? `(Editing ${editType})` : ''}
          </span>
        </div>

        {isHost ? (
          <HostForm editId={editId} editType={editType} />
        ) : (
          <TravellerForm editId={editId} editType={editType} />
        )}
      </div>
    </div>
  );
}

// src/pages/PostForm.jsx
import React, { useEffect } from "react";
import HostForm from "../components/forms/HostForm";
import TravellerForm from "../components/forms/TravellerForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If we're done loading and still no user, kick to home/login
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C59A2F]"></div>
      </div>
    );
  }

  if (!user) return null;

  // Determine role - support both "host" and "admin" as having host privileges
  const rawRole = (user.role || "guest").toLowerCase();
  const isHost = rawRole === "host" || rawRole === "admin";

  return (
    <div className="mx-0 p-0 md:p-4 mb-20 md:mb-0">
      <div className="max-w-4xl mx-auto">
        {isHost ? (
          <HostForm />
        ) : (
          <TravellerForm />
        )}
      </div>
    </div>
  );
}

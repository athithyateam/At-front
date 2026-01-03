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
    if (!loading && !user) {
      // If not logged in, redirect to login page
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is not found, the useEffect will handle redirection
  if (!user) return null;

  // Real-time role check from database via AuthContext
  const role = user.role?.toLowerCase();

  return (
    <div className="mx-4 md:mx-8 p-4 pt-12 mb-20 md:mb-0">
      <div className="max-w-4xl mx-auto">
        {role === "host" ? (
          <div className="space-y-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Create New Offering</h1>
              <p className="text-gray-600 text-sm">Fill in the details for your new service or trek.</p>
            </div>
            <HostForm />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Share Your Experience</h1>
              <p className="text-gray-600 text-sm">Tell the community about your latest adventure.</p>
            </div>
            <TravellerForm />
          </div>
        )}
      </div>
    </div>
  );
}

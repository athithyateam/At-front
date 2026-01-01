import React from "react";
import { motion } from "framer-motion";
import { FiMoreVertical } from "react-icons/fi";

export default function BaseTravelProfile({ user, isOwner, children }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Cover */}
      <div
        className="h-56 md:h-72 lg:h-96 bg-center bg-cover border-b"
        style={{
          backgroundImage: `url(${user?.background || "https://www.theindia.co.in/blog/wp-content/uploads/2023/09/Thighest-peak-of-uttarakhand.jpg"
            })`,
          filter: "brightness(0.85)",
        }}
      />

      {/* Profile card */}
      <div className="max-w-6xl mx-auto -mt-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-xl p-5 md:p-8 flex flex-col md:flex-row gap-6"
        >
          {/* Avatar */}
          <div className="shrink-0 -mt-12 md:mt-0">
            <div className="w-32 h-32 rounded-full ring-4 ring-white overflow-hidden shadow">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#C59A2F] flex items-center justify-center text-white text-3xl font-bold uppercase tracking-tighter">
                  {user?.firstname?.charAt(0) || ""}{user?.lastname?.charAt(0) || (user?.firstname ? "" : "U")}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {user.firstname} {user.lastname}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {user.location?.city
                    ? `${user.location.city}, ${user.location.state}, ${user.location.country}`
                    : "India"}
                </p>
                {user.description && (
                  <p className="mt-3 text-gray-600 text-sm max-w-3xl">
                    {user.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {!isOwner && (
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:brightness-95">
                    Message
                  </button>
                )}
                <button className="w-10 h-10 rounded border flex items-center justify-center hover:bg-gray-50">
                  <FiMoreVertical />
                </button>
              </div>
            </div>

            {/* Dynamic role-based content */}
            <div className="mt-6">{children}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

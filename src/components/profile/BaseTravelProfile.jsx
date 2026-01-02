import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function BaseTravelProfile({ user, isOwner, children }) {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Close menu on click outside
  useEffect(() => {
    const closeMenu = (e) => {
      // If menu is open and click is not inside the menu container (simple check)
      // For a more robust check we could use useRef, but this is a quick valid DOM check if we attached a common class or handled bubbling carefully. 
      // Actually, standard practice is useRef. Let's rely on bubbling or just global click closing it if it doesn't hit the button.
    };

    // Better simple implementation:
    const handleGlobalClick = (e) => {
      // We will assume simpler logic: if showMenu is true, any click closes it,
      // unless we stopped propagation on the menu itself.
      // We'll add stopPropagation to the menu button and container.
    };
  }, []);

  // Actually, let's just use a backdrop or window event.
  useEffect(() => {
    const handleWindowClick = () => setShowMenu(false);
    if (showMenu) {
      window.addEventListener('click', handleWindowClick);
    }
    return () => window.removeEventListener('click', handleWindowClick);
  }, [showMenu]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
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

// Actions
              <div className="flex items-center gap-2 relative">
                {!isOwner && (
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:brightness-95">
                    Message
                  </button>
                )}

                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(!showMenu);
                    }}
                    className="w-10 h-10 rounded border flex items-center justify-center hover:bg-gray-50 bg-white"
                  >
                    <FiMoreVertical />
                  </button>

                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 ring-1 ring-black ring-opacity-5">
                      {isOwner && (
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          Logout
                        </button>
                      )}

                      {/* You can add more menu items here later */}
                      {!isOwner && (
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowMenu(false)}
                        >
                          Report User
                        </button>
                      )}
                    </div>
                  )}
                </div>
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

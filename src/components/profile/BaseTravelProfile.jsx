import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoreVertical, FiEdit3, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./EditProfileModal";

export default function BaseTravelProfile({ user: initialUser, isOwner, children }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState(initialUser);

  const { logout, user: authUser, setUser: setAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  // Close menu on click outside
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

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    // If updating own profile, sync with AuthContext
    if (isOwner && setAuthUser) {
      setAuthUser({
        ...authUser,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        avatar: updatedUser.avatar,
        description: updatedUser.description
      });
    }
  };

  const avatarUrl = (typeof user?.avatar === "string" ? user.avatar : user?.avatar?.url) || "";

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
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-[#C59A2F] to-[#A07A1F] flex items-center justify-center text-white text-3xl font-black uppercase tracking-tighter shadow-inner">
                  {user?.firstname?.charAt(0) || ""}{user?.lastname?.charAt(0) || (user?.firstname ? "" : "U")}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-left">
                  {user.firstname} {user.lastname}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-[#C59A2F]/10 text-[#C59A2F] inline-block border border-[#C59A2F]/20">
                    {user.role || 'guest'}
                  </span>
                </div>
                {user.description && (
                  <p className="mt-3 text-gray-600 text-sm max-w-3xl text-left whitespace-pre-wrap">
                    {user.description}
                  </p>
                )}
              </div>

              {/* Actions */}
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
                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100"
                      >
                        {isOwner && (
                          <>
                            <button
                              onClick={() => {
                                setShowEditModal(true);
                                setShowMenu(false);
                              }}
                              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium"
                            >
                              <FiEdit3 className="text-[#C59A2F]" /> Edit Profile
                            </button>
                            <div className="h-px bg-gray-100 my-1 mx-2" />
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-medium"
                            >
                              <FiLogOut /> Logout
                            </button>
                          </>
                        )}

                        {!isOwner && (
                          <button
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowMenu(false)}
                          >
                            Report User
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Editing Modal */}
            <AnimatePresence>
              {showEditModal && (
                <EditProfileModal
                  user={user}
                  onClose={() => setShowEditModal(false)}
                  onUpdate={handleUpdateUser}
                />
              )}
            </AnimatePresence>

            {/* Dynamic role-based content */}
            <div className="mt-6">{children}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

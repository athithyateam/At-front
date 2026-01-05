import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MdClose, MdLogout, MdExplore, MdMessage, MdPerson, MdGroups } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        onClose();
        navigate("/");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-800">Menu</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto py-4">
                            {user && (
                                <Link
                                    to={`/profile/${user._id}`}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-6 py-3 mb-4 hover:bg-gray-50 transition-colors group"
                                >
                                    {/* Avatar Placeholder / Image */}
                                    <div className="w-10 h-10 rounded-full bg-[#fae8b4] text-[#C59A2F] flex items-center justify-center font-bold text-lg border border-[#C59A2F]/30 shrink-0 overflow-hidden">
                                        {(typeof user.avatar === "string" ? user.avatar : user.avatar?.url) ? (
                                            <img
                                                src={typeof user.avatar === "string" ? user.avatar : user.avatar?.url}
                                                alt="avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            (user.firstname?.charAt(0) || "U").toUpperCase()
                                        )}
                                    </div>

                                    <div className="overflow-hidden flex flex-col justify-center">
                                        <div className="font-bold text-gray-900 truncate group-hover:text-[#C59A2F] transition-colors capitalize leading-tight">
                                            {user.firstname} {user.lastname}
                                        </div>
                                        <div className="text-[10px] font-bold text-[#C59A2F] uppercase tracking-wider mt-0.5">
                                            {user.role || "Traveler"}
                                        </div>
                                    </div>
                                </Link>
                            )}

                            <nav className="flex flex-col space-y-1">
                                {/* Main Features - Only for Logged In Users */}
                                {user && (
                                    <>
                                        <SidebarLink
                                            to="/explore"
                                            label="Explore"
                                            icon={<MdExplore size={20} />}
                                            onClose={onClose}
                                        />
                                        <SidebarLink
                                            to="/connect"
                                            label="Connect"
                                            icon={<FaUserFriends size={20} />}
                                            onClose={onClose}
                                        />
                                        <SidebarLink
                                            to="/chat"
                                            label="Messages"
                                            icon={<MdMessage size={20} />}
                                            onClose={onClose}
                                        />


                                    </>
                                )}

                                {/* Secondary Links - Visible only on mobile where Navbar links are hidden */}
                                <div className="md:hidden">
                                    <SidebarLink to="/host" label="For Host" onClose={onClose} />
                                    <SidebarLink to="/creators" label="For Creators" onClose={onClose} />
                                    <SidebarLink to="/about" label="About Us" onClose={onClose} />
                                </div>
                            </nav>
                        </div>

                        {/* Footer / Logout */}
                        {user ? (
                            <div className="p-5 border-t border-gray-100">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
                                >
                                    <MdLogout size={20} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="p-5 border-t border-gray-100">
                                <Link
                                    to="/?auth=login"
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#C59A2F] text-white rounded-xl transition-all font-medium hover:bg-[#b0892a]"
                                >
                                    Login / Sign Up
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function SidebarLink({ to, label, icon, onClose }) {
    return (
        <Link
            to={to}
            onClick={onClose}
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#C59A2F] transition-colors font-medium"
        >
            {icon && <span className="opacity-70">{icon}</span>}
            {label}
        </Link>
    );
}

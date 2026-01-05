import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { createPortal } from "react-dom";

import AuthModal from "../auth/AuthSection";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [authProps, setAuthProps] = useState({});

  const threshold = 50;
  const isHome = location.pathname === "/";

  /* ---------------- Scroll effect ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  /* ---------------- Close profile dropdown ---------------- */
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".notification-dropdown")) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* ---------------- Auto close auth modal ---------------- */
  useEffect(() => {
    if (user) setShowAuth(false);
  }, [user]);

  /* ---------------- Open auth from URL params ---------------- */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authType = params.get("auth"); // 'login' or 'signup'
    const role = params.get("role");

    if (authType) {
      setAuthProps({
        initialScreen: authType === "signup" ? "register" : "login",
        initialRole: role || "guest",
      });
      setShowAuth(true);

      // Clean URL
      const newSearch = new URLSearchParams(location.search);
      newSearch.delete("auth");
      newSearch.delete("role");
      const newString = newSearch.toString();

      navigate(
        { pathname: location.pathname, search: newString },
        { replace: true }
      );
    }
  }, [location.search, navigate]);

  const navBase = "absolute inset-x-0 top-0 z-50 transition-all duration-300";
  const heroNav = scrolled
    ? "bg-black/60 backdrop-blur-md shadow-lg"
    : "bg-transparent";
  const contentNav = "bg-white border-b border-gray-200";

  const iconColor = isHome
    ? scrolled
      ? "text-[#C59A2F]"
      : "text-white/90"
    : "text-[#C59A2F]";

  const centerLinkStyle = (path) =>
    `relative text-[0.975rem] font-medium transition-all duration-300
   after:content-[''] after:absolute after:left-0 after:-bottom-1
   after:h-[2px] after:w-0 after:bg-[#C59A2F]
   after:transition-all after:duration-300
   hover:after:w-full
   ${location.pathname === path
      ? "text-[#C59A2F] after:w-full"
      : isHome
        ? scrolled
          ? "text-white/90 hover:text-[#C59A2F]"
          : "text-white/80 hover:text-white"
        : "text-gray-700 hover:text-[#C59A2F]"
    }`;

  /* ---------------- Block render until auth resolves ---------------- */
  if (loading) {
    return (
      <nav className="absolute inset-x-0 top-0 z-50 h-16 bg-white border-b border-gray-200" />
    );
  }

  return (
    <>
      <nav
        className={`${navBase} ${isHome ? heroNav : contentNav}`}
        style={{ height: 64 }}
      >
        <div className="w-full h-full flex items-center justify-between px-4">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src="/athithya-logo.png"
              alt="Athithya Logo"
              className="h-10 md:h-14 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* CENTER LINKS (hidden on small screens) - REMOVED */
          /* <div className="hidden md:flex items-center gap-8"> ... </div> */}

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-5">
            {user ? (
              <>
                {/* NOTIFICATIONS */}
                <div className="relative notification-dropdown">
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className={`relative ${iconColor} transition hover:scale-105`}
                  >
                    <FaBell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-2 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5 border border-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {notificationOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b flex items-center justify-between bg-gray-50">
                        <h3 className="font-semibold text-gray-700">Notifications</h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearNotifications}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Clear all
                          </button>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-gray-500 text-sm">
                            No new notifications
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => {
                                markAsRead(n.id);
                                if (n.link) {
                                  navigate(n.link);
                                  setNotificationOpen(false);
                                }
                              }}
                              className={`px-4 py-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer transition ${n.read ? "bg-white" : "bg-blue-50/40"
                                }`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <h4 className={`text-sm ${!n.read ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                                  {n.title}
                                </h4>
                                <span className="text-[10px] text-gray-400 whitespace-nowrap">
                                  {new Date(n.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                {n.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>

                      {unreadCount > 0 && (
                        <div className="p-2 border-t bg-gray-50 text-center">
                          <button
                            onClick={markAllAsRead}
                            className="text-xs font-medium text-[#C59A2F] hover:underline"
                          >
                            Mark all as read
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* CREATE POST */}
                <Link
                  to="/post"
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition ${isHome
                    ? scrolled
                      ? "bg-[#C59A2F] text-white"
                      : "border border-white/80 text-white"
                    : "bg-[#C59A2F] text-white"
                    } hover:scale-105`}
                >
                  <MdAdd size={20} />
                </Link>

                {/* PROFILE DROPDOWN */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition ${isHome
                    ? scrolled
                      ? "bg-[#C59A2F] text-white"
                      : "border border-white/80 text-white"
                    : "border border-[#C59A2F] text-[#C59A2F]"
                    }`}
                >
                  <RxHamburgerMenu size={18} />
                </button>
              </>
            ) : (
              <>


                {/* Mobile: Hamburger Menu */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition ${isHome
                    ? scrolled
                      ? "border border-[#C59A2F] text-[#C59A2F]"
                      : "border border-white/80 text-white"
                    : "border border-[#C59A2F] text-[#C59A2F]"
                    }`}
                >
                  <RxHamburgerMenu size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* AUTH MODAL */}
      {showAuth &&
        createPortal(
          <AuthModal
            onClose={() => {
              setShowAuth(false);
              setAuthProps({});
            }}
            {...authProps}
          />,
          document.body
        )}
    </>
  );
}

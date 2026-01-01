import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { createPortal } from "react-dom";

import AuthModal from "../auth/AuthSection";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, loading } = useAuth();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      if (!e.target.closest(".profile-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* ---------------- Auto close auth modal ---------------- */
  useEffect(() => {
    if (user) setShowAuth(false);
  }, [user]);

  const navBase = "fixed inset-x-0 top-0 z-50 transition-all duration-300";
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
   ${
     location.pathname === path
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
      <nav className="fixed inset-x-0 top-0 z-50 h-16 bg-white border-b border-gray-200" />
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
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* CENTER LINKS (hidden on small screens) */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/host" className={centerLinkStyle("/host")}>
              For Host
            </Link>
            <Link to="/creators" className={centerLinkStyle("/creators")}>
              For Creators
            </Link>
            <Link to="/about" className={centerLinkStyle("/about")}>
              About Us
            </Link>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-5">
            {user ? (
              <>
                {/* NOTIFICATIONS */}
                <Link to="/notifications" className={`relative ${iconColor}`}>
                  <FaBell size={20} />
                  <span className="absolute -top-2 -right-1 text-[10px] bg-[#C59A2F] text-white rounded-full px-1">
                    0
                  </span>
                </Link>

                {/* CREATE POST */}
                <Link
                  to="/post"
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition ${
                    isHome
                      ? scrolled
                        ? "bg-[#C59A2F] text-white"
                        : "border border-white/80 text-white"
                      : "bg-[#C59A2F] text-white"
                  } hover:scale-105`}
                >
                  <MdAdd size={20} />
                </Link>

                {/* PROFILE DROPDOWN */}
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setDropdownOpen((p) => !p)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                      isHome
                        ? scrolled
                          ? "bg-[#C59A2F] text-white"
                          : "border border-white/80 text-white"
                        : "border border-[#C59A2F] text-[#C59A2F]"
                    }`}
                  >
                    <RxHamburgerMenu size={18} />
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-44 rounded-xl border overflow-hidden transition-all ${
                      dropdownOpen
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-2 invisible"
                    } ${
                      isHome
                        ? "bg-black/80 backdrop-blur border-[#C59A2F]/40"
                        : "bg-white border-gray-200 shadow-lg"
                    }`}
                  >
                    {[
                      ["Explore", "/explore"],
                      ["Connect", "/connect"],
                      ["Messages", "/chat"],
                      ["Profile", `/profile/${user._id}`],
                    ].map(([label, path]) => (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm transition ${
                          isHome
                            ? "text-white hover:bg-[#C59A2F]"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="cursor-pointer flex items-center gap-2 px-5 py-2 bg-[#C59A2F] text-white rounded shadow-lg"
              >
                <FiUser />
                Login / Sign up
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* AUTH MODAL */}
      {showAuth &&
        createPortal(
          <AuthModal onClose={() => setShowAuth(false)} />,
          document.body
        )}
    </>
  );
}

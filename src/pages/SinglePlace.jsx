// src/components/SinglePlace.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaPhoneAlt,
  FaRupeeSign,
  FaHeadset,
  FaStarHalfAlt,
  FaHeart,
} from "react-icons/fa";
import SmallCarousel from "../components/SmallCarousel";

const HERO_SRC =
  "https://images.pexels.com/photos/16660010/pexels-photo-16660010.jpeg?cs=srgb&dl=pexels-vinod-singh-489965859-16660010.jpg&fm=jpg";

const PHOTO_IMAGES = [
  "https://i0.wp.com/www.travelkingindia.com/wp-content/uploads/2025/08/Chopta-1.jpg?fit=910%2C512&ssl=1",
  HERO_SRC,
  "https://images.pexels.com/photos/18893740/pexels-photo-18893740.jpeg",
];

const COLORS = {
  gold: "#D4A017",
  goldDark: "#B58812",
  white: "#FFFFFF",
  lightGoldBg: "#FFF7E6",
  text: "#333333",
  muted: "#8b8b8b",
  border: "#EAEAEA",
  orangeBg:
    "linear-gradient(180deg, rgba(212,160,23,0.95), rgba(212,160,23,0.9))",
};

const TABS = [
  { key: "detail", label: "Detail" },
  { key: "photos", label: "Photos" },
  { key: "Plan", label: "Plan" },
  { key: "map", label: "Map" },
  { key: "hosts", label: "Hosts" },
  { key: "reviews", label: "Reviews" },
];

// Simple host data for the Hosts carousel
const HOSTS = [
  {
    name: "Aditi Rawat",
    role: "Local Trek Leader",
    location: "Chopta, Uttarakhand",
    experience: "8+ years guiding Himalayan treks",
    rating: "4.9",
  },
  {
    name: "Mahesh Negi",
    role: "Mountain Guide",
    location: "Rudraprayag, Uttarakhand",
    experience: "Certified guide, 100+ groups led",
    rating: "4.8",
  },
  {
    name: "Kavita Bisht",
    role: "Camp Host",
    location: "Sari Village, Uttarakhand",
    experience: "Expert in local culture & homestays",
    rating: "4.7",
  },
];

export default function SinglePlace({ tabs = TABS }) {
  const [active, setActive] = useState(tabs[0].key);

  // underline moving logic
  const navRef = useRef(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeBtn = nav.querySelector(`[data-key="${active}"]`);
    if (activeBtn) {
      const rect = activeBtn.getBoundingClientRect();
      const parentRect = nav.getBoundingClientRect();
      setUnderline({ left: rect.left - parentRect.left, width: rect.width });
    }
    // update on resize
    const onResize = () => {
      const btn = nav.querySelector(`[data-key="${active}"]`);
      if (btn) {
        const r = btn.getBoundingClientRect();
        const parentRect = nav.getBoundingClientRect();
        setUnderline({
          left: r.left - parentRect.left,
          width: r.width,
        });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, tabs]);

  return (
    <div
      style={{ backgroundColor: COLORS.white, color: COLORS.text }}
      className="min-h-screen font-sans"
    >
      {/* HERO */}
      <div className="w-full overflow-hidden">
        <img
          src={HERO_SRC}
          alt="uttarakhand hero"
          className="w-full h-[52vh] md:h-[68vh] lg:h-[72vh] object-cover"
          style={{ display: "block" }}
        />
      </div>

      {/* Tabs + content card */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 mt-6">
        <div
          className="rounded-lg shadow-lg p-4 md:p-6"
          style={{
            backgroundColor: COLORS.white,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          {/* Tabs with smooth underline */}
          <div className="relative">
            <nav ref={navRef} className="flex gap-3 overflow-x-auto pb-1">
              {tabs.map((t) => {
                const isActive = active === t.key;
                return (
                  <button
                    key={t.key}
                    data-key={t.key}
                    onClick={() => setActive(t.key)}
                    className="relative px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
                    style={{
                      background: isActive ? COLORS.white : "transparent",
                      color: isActive ? COLORS.text : COLORS.muted,
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </nav>

            {/* animated underline - absolute element */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                height: 3,
                borderRadius: 4,
                backgroundColor: COLORS.gold,
                bottom: 0,
                left: underline.left,
                width: underline.width,
                transition:
                  "left 280ms cubic-bezier(.2,.9,.2,1), width 280ms cubic-bezier(.2,.9,.2,1)",
              }}
            />
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* LEFT - detail area (spans 2 cols) */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {active === "detail" && (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="rounded-lg p-6"
                    style={{
                      backgroundColor: COLORS.white,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    {/* Title + stars */}
                    <h1
                      className="text-3xl md:text-4xl font-bold mb-3 italic"
                      style={{ color: COLORS.text }}
                    >
                      Chopta — Trekking Meadows of Uttarakhand
                    </h1>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1 text-amber-500">
                        <FaStar style={{ color: COLORS.gold }} />
                        <FaStar style={{ color: COLORS.gold }} />
                        <FaStar style={{ color: COLORS.gold }} />
                        <FaStar style={{ color: COLORS.gold }} />
                        <FaStarHalfAlt style={{ color: COLORS.gold }} />
                      </div>
                      <div style={{ color: COLORS.muted, fontSize: 14 }}>
                        (2 Reviews)
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="text-base leading-relaxed mb-6 italic"
                      style={{ color: COLORS.text }}
                    >
                      Chopta, often called the “Mini Switzerland of India,” is a
                      high-altitude meadow and a gateway to Tungnath and
                      Chandrashila in Uttarakhand. Famous for lush alpine
                      meadows, panoramic Himalayan views, and rhododendron
                      forests, Chopta is perfect for short treks and
                      beginner-friendly camping. The trek to Tungnath (the
                      world’s highest Shiva temple) and the sunrise view from
                      Chandrashila are the highlights — ideal for nature lovers
                      and photographers seeking quiet mountain vistas.
                    </p>

                    {/* Trip highlights + important note */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className="p-4 border rounded-md"
                        style={{ borderColor: COLORS.border }}
                      >
                        <h3
                          style={{ color: COLORS.text }}
                          className="font-semibold"
                        >
                          Trip Highlights
                        </h3>
                        <ul
                          style={{ color: COLORS.muted }}
                          className="mt-2 space-y-2 text-sm"
                        >
                          <li>• Alpine meadows & Himalayan views</li>
                          <li>• Short treks to Tungnath & Chandrashila</li>
                          <li>• Best between April–June & Sept–Nov</li>
                        </ul>
                      </div>

                      <div
                        className="p-4"
                        style={{
                          background: COLORS.lightGoldBg,
                          borderLeft: `4px solid ${COLORS.gold}`,
                        }}
                      >
                        <h4
                          style={{ color: COLORS.goldDark }}
                          className="font-bold"
                        >
                          Important
                        </h4>
                        <p style={{ color: COLORS.muted }} className="text-sm">
                          Carry warm clothing, good trekking shoes, and basic
                          first-aid. Weather can change quickly at altitude.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {active === "photos" && (
                  <motion.div
                    key="photos"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-lg p-6"
                    style={{
                      backgroundColor: COLORS.white,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <h2 className="text-2xl font-semibold mb-4">Photos</h2>

                    <SmallCarousel images={PHOTO_IMAGES} />
                  </motion.div>
                )}

                {active === "Plan" && (
                  <motion.div
                    key="Plan"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-lg p-6"
                    style={{
                      backgroundColor: COLORS.white,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <h2 className="text-2xl font-semibold mb-3">Plan</h2>
                    <ol
                      className="list-decimal ml-5 space-y-2"
                      style={{ color: COLORS.muted }}
                    >
                      <li>Pickup & briefing</li>
                      <li>Drive to Chopta, short acclimatization</li>
                      <li>Trek to Tungnath & Chandrashila (sunrise option)</li>
                      <li>Return and drop-off</li>
                    </ol>
                  </motion.div>
                )}

                {active === "map" && (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-lg p-6"
                    style={{
                      backgroundColor: COLORS.white,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <h2 className="text-2xl font-semibold mb-3">Map</h2>
                    <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                      Map placeholder
                    </div>
                  </motion.div>
                )}

                {/* ✅ HOSTS TAB: replaces FAQ, shows horizontal "carousel" of hosts */}
                {active === "hosts" && (
                  <motion.div
                    key="hosts"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-lg p-6"
                    style={{
                      backgroundColor: COLORS.white,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <h2 className="text-2xl font-semibold mb-3">
                      Meet Your Hosts
                    </h2>
                    <p className="text-sm mb-4" style={{ color: COLORS.muted }}>
                      Local experts from Uttarakhand who make this experience
                      safe, authentic and memorable.
                    </p>

                    <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
                      {HOSTS.map((host) => (
                        <div
                          key={host.name}
                          className="min-w-[230px] max-w-[260px] rounded-lg border bg-white shadow-sm p-4 flex flex-col justify-between"
                          style={{ borderColor: COLORS.border }}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-base">
                                {host.name}
                              </h3>
                              <span
                                className="text-xs font-medium px-2 py-1 rounded-full"
                                style={{
                                  backgroundColor: COLORS.lightGoldBg,
                                  color: COLORS.goldDark,
                                }}
                              >
                                ⭐ {host.rating}
                              </span>
                            </div>
                            <p
                              className="text-xs mb-1"
                              style={{ color: COLORS.muted }}
                            >
                              {host.role}
                            </p>
                            <p
                              className="text-xs mb-2"
                              style={{ color: COLORS.muted }}
                            >
                              {host.location}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: COLORS.muted }}
                            >
                              {host.experience}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1 text-[11px] text-gray-500">
                              <FaPhoneAlt className="text-[11px]" /> On-trip
                              support
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {active === "reviews" && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-lg p-6"
                    style={{
                      backgroundColor: COLORS.white,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
                    <div style={{ color: COLORS.muted }}>
                      <div className="mb-3">
                        <strong>Priya</strong> — "Amazing sunrise views"
                        ⭐⭐⭐⭐⭐
                      </div>
                      <div>
                        <strong>Arjun</strong> — "Great guide & safe trek."
                        ⭐⭐⭐⭐☆
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT - sticky sidebar (unchanged from your latest version) */}
            <aside className="relative">
              <div className="lg:sticky top-28 space-y-4 -mt-16">
                <div
                  style={{
                    backgroundColor: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                  }}
                  className="rounded-lg"
                >
                  <div
                    className="p-4 border-b"
                    style={{ borderColor: COLORS.border }}
                  >
                    <h4
                      style={{ color: COLORS.text }}
                      className="font-semibold text-lg"
                    >
                      Why Choose Athithya?
                    </h4>
                  </div>

                  <div style={{ borderTop: `1px solid ${COLORS.border}` }}>
                    <ul
                      className="divide-y divide-gray-300"
                      style={{ borderColor: COLORS.border }}
                    >
                      <li
                        className="flex items-start gap-3 px-4 py-4"
                        style={{ color: COLORS.muted }}
                      >
                        <div style={{ width: 28, color: COLORS.gold }}>
                          <FaStar />
                        </div>
                        <div>
                          <strong style={{ color: COLORS.text }}>
                            Experiences led by locals
                          </strong>
                          <p className="text-xs mt-1">
                            Travel with people who live here — not agents, not
                            middlemen.
                          </p>
                        </div>
                      </li>

                      <li
                        className="flex items-start gap-3 px-4 py-4"
                        style={{ color: COLORS.muted }}
                      >
                        <div style={{ width: 28, color: COLORS.gold }}>
                          <FaRupeeSign />
                        </div>
                        <div>
                          <strong style={{ color: COLORS.text }}>
                            Transparent & fair pricing
                          </strong>
                          <p className="text-xs mt-1">
                            No hidden charges. What you see is what you pay.
                          </p>
                        </div>
                      </li>

                      <li
                        className="flex items-start gap-3 px-4 py-4"
                        style={{ color: COLORS.muted }}
                      >
                        <div style={{ width: 28, color: COLORS.gold }}>
                          <FaHeadset />
                        </div>
                        <div>
                          <strong style={{ color: COLORS.text }}>
                            On-trip human support
                          </strong>
                          <p className="text-xs mt-1">
                            Real people available before, during, and after your
                            journey.
                          </p>
                        </div>
                      </li>

                      <li
                        className="flex items-start gap-3 px-4 py-4"
                        style={{ color: COLORS.muted }}
                      >
                        <div style={{ width: 28, color: COLORS.gold }}>
                          <FaHeart />
                        </div>
                        <div>
                          <strong style={{ color: COLORS.text }}>
                            Community-driven travel
                          </strong>
                          <p className="text-xs mt-1">
                            Built on trust, stories, and shared experiences —
                            not mass tourism.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  className="rounded-lg overflow-hidden"
                  style={{
                    background: COLORS.orangeBg,
                    color: COLORS.white,
                  }}
                >
                  <div className="p-5">
                    <h4 className="text-xl font-bold mb-2">Get a Question?</h4>
                    <p className="text-sm mb-4" style={{ opacity: 0.95 }}>
                      Do not hesitate to give us a call. We are an expert team
                      and we are happy to talk to you.
                    </p>

                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ fontSize: 20 }} className="opacity-95">
                        📞
                      </div>
                      <div>
                        <div className="font-bold" style={{ fontSize: 18 }}>
                          +91 9389860637
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div style={{ fontSize: 18 }} className="opacity-95">
                        ✉️
                      </div>
                      <div className="font-semibold">teamsathithya@gmail.com</div>
                    </div>
                  </div>
                </div>
                {/* end of sticky blocks */}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

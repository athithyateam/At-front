// src/pages/guides/BestSeasonUttarakhand.jsx
import React from "react";
import { motion } from "framer-motion";

const GOLD = "#C59D5F";

export default function BestSeasonUttarakhand() {
  return (
    <div className="bg-[#fff7e6] min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden">
        <img
          src="https://www.peakadventuretour.com/assets/imgs/uttarakhand-tourism-01.webp"
          alt="Uttarakhand mountains"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

        <div className="relative mx-6 px-6 h-full flex items-end pb-20">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Best Season to Visit Uttarakhand
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/90 max-w-2xl"
            >
              Weather, treks, temples & local tips — discover when Uttarakhand
              is perfect for your kind of travel.
            </motion.p>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-white/80">
              <span>📍 Himalayas, India</span>
              <span>⏱ 4 min read</span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur">
                Travel Guide
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER ================= */}
      <section className=" mx-6 px-6 -mt-10 relative z-10">
        <div
          className="bg-white border-l-4 p-6 rounded-xl shadow-sm"
          style={{ borderColor: GOLD }}
        >
          <p className="text-gray-800 text-lg">
            💡 <strong>Best time to visit:</strong>{" "}
            <span className="font-medium">March–June</span> for most travellers,{" "}
            <span className="font-medium">October–November</span> for trekking
            and clear mountain views.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-6 px-6 py-16 space-y-14">
        {/* SPRING / SUMMER */}
        <SeasonCard
          title="Spring & Summer (March – June)"
          badge="Best for most travellers"
          points={[
            "Pleasant weather (10°C – 25°C)",
            "Ideal for families & first-time visitors",
            "Perfect for sightseeing & hill stations",
          ]}
          bestFor="Sightseeing, families, couples"
          tip="Carry light woollens — evenings can be cool."
        />

        {/* MONSOON */}
        <SeasonCard
          title="Monsoon (July – September)"
          badge="Travel with caution"
          points={[
            "Heavy rainfall & landslides",
            "Lush green valleys",
            "Lower crowds & budget stays",
          ]}
          bestFor="Nature lovers, photographers"
          tip="Avoid high-altitude routes. Check road updates daily."
        />

        {/* AUTUMN */}
        <SeasonCard
          title="Autumn (October – November)"
          badge="Trekker’s favourite"
          points={[
            "Crystal-clear Himalayan views",
            "Best trekking conditions",
            "Crisp, dry weather",
          ]}
          bestFor="Trekkers, adventure seekers"
          tip="Pack thermals — nights get cold."
        />

        {/* WINTER */}
        <SeasonCard
          title="Winter (December – February)"
          badge="Snow lovers only"
          points={[
            "Snowfall in Auli, Chopta, Munsiyari",
            "Skiing & winter landscapes",
            "Very cold temperatures",
          ]}
          bestFor="Snow experience, skiing"
          tip="Check accessibility before booking."
        />
      </section>

      {/* ================= PURPOSE GRID ================= */}
      <section className="bg-white py-16">
        <div className="mx-6 px-6">
          <h2 className="text-2xl font-semibold mb-8" style={{ color: GOLD }}>
            Best time by travel purpose
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <PurposeCard title="🏞 Sightseeing" value="March – June" />
            <PurposeCard title="🥾 Trekking" value="April – June · Oct – Nov" />
            <PurposeCard title="🕉 Pilgrimage" value="May – June · Sep – Oct" />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-6 px-6 py-20">
        <div
          className="rounded-2xl p-10 text-center shadow-sm"
          style={{ background: "#fffdf8", border: `1px solid ${GOLD}` }}
        >
          <h3 className="text-2xl font-semibold mb-3">
            Planning your Uttarakhand trip?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore curated treks, stays & experiences by local hosts.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              className="px-6 py-3 rounded-xl text-white"
              style={{ background: GOLD }}
            >
              View Treks
            </button>
            <button
              className="px-6 py-3 rounded-xl border"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              Browse Homestays
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function SeasonCard({ title, badge, points, bestFor, tip }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-xs px-3 py-1 rounded-full bg-[#fff7e6] text-gray-700">
          {badge}
        </span>
      </div>

      <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <p className="text-sm text-gray-600 mb-2">
        <strong>Best for:</strong> {bestFor}
      </p>
      <p className="text-sm text-gray-500">📌 {tip}</p>
    </motion.div>
  );
}

function PurposeCard({ title, value }) {
  return (
    <div className="bg-[#fffdf8] rounded-xl p-6 border text-center border-[GOLD]">
      <h4 className="text-lg font-medium mb-2">{title}</h4>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}

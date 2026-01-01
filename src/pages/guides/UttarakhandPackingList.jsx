// src/pages/guides/UttarakhandPackingList.jsx
import { motion } from "framer-motion";

const GOLD = "#C59D5F";

/* ================= PACKING DATA ================= */

const SEASON_PACKING = [
  {
    title: "Summer (March – June)",
    desc:
      "Pleasant days but cool evenings in the hills. Ideal for sightseeing, treks & family trips.",
    items: [
      "Light cotton clothes",
      "Light jacket or fleece",
      "Comfortable walking shoes",
      "Cap / sunglasses",
      "Sunscreen & lip balm",
      "Reusable water bottle",
    ],
  },
  {
    title: "Monsoon (July – September)",
    desc:
      "Lush greenery but frequent rains. Roads can be slippery — pack smart & waterproof.",
    items: [
      "Rain jacket / poncho",
      "Quick-dry clothes",
      "Waterproof backpack cover",
      "Good grip footwear",
      "Insect repellent",
      "Extra socks",
    ],
  },
  {
    title: "Autumn (October – November)",
    desc:
      "Clear skies, crisp air & best trekking season. Nights can get cold.",
    items: [
      "Warm layers",
      "Thermals (light)",
      "Windproof jacket",
      "Trekking shoes",
      "Gloves & beanie",
      "Day backpack",
    ],
  },
  {
    title: "Winter (December – February)",
    desc:
      "Cold temperatures & snowfall in higher regions like Auli, Chopta & treks.",
    items: [
      "Heavy woollens",
      "Thermal innerwear",
      "Down jacket",
      "Woollen cap & gloves",
      "Snow-friendly shoes",
      "Moisturiser & lip care",
    ],
  },
];

const TREK_ESSENTIALS = [
  "Backpack (40–60L)",
  "Trekking shoes (broken-in)",
  "Trekking poles",
  "Quick-dry t-shirts",
  "Thermals & fleece",
  "Rain cover",
  "Headlamp / torch",
  "Personal medicines",
  "Sunscreen & sunglasses",
  "Reusable cutlery",
];

const DOCUMENTS = [
  "Government ID (Aadhaar / Passport)",
  "Hotel or trek bookings",
  "Emergency contact list",
  "Offline maps",
  "Cash (ATMs limited in hills)",
];

/* ================= PAGE ================= */

export default function UttarakhandPackingList() {
  return (
    <div className="bg-[#fff7e6] min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="Uttarakhand packing list"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative h-full flex items-center px-6 mx-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Uttarakhand Packing List
            </motion.h1>
            <p className="text-lg text-white/90 max-w-2xl">
              What to pack for Uttarakhand — season-wise, trek-wise & practical
              essentials so you don’t overpack or forget the basics.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-6 py-20 space-y-28 mx-6">

        {/* SEASON WISE */}
        <section className="space-y-14">
          <h2 className="text-3xl font-semibold" style={{ color: GOLD }}>
            Season-wise Packing
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {SEASON_PACKING.map((s) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border shadow-sm"
                style={{ borderColor: GOLD }}
              >
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{s.desc}</p>

                <ul className="space-y-2 text-gray-700">
                  {s.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TREK ESSENTIALS */}
        <section
          className="bg-white rounded-2xl p-10 border"
          style={{ borderColor: GOLD }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: GOLD }}>
            Trekking Essentials (Must-have)
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            {TREK_ESSENTIALS.map((i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-lg">✓</span>
                <span>{i}</span>
              </div>
            ))}
          </div>
        </section>

        {/* DOCUMENTS */}
        <section
          className="bg-white rounded-2xl p-10 border"
          style={{ borderColor: GOLD }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: GOLD }}>
            Important Documents
          </h2>

          <ul className="space-y-2 text-gray-700">
            {DOCUMENTS.map((d) => (
              <li key={d}>• {d}</li>
            ))}
          </ul>
        </section>

        {/* TIPS */}
        <section
          className="bg-white rounded-2xl p-10 border"
          style={{ borderColor: GOLD }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Smart Packing Tips
          </h3>
          <ul className="text-gray-700 space-y-2">
            <li>• Layering is better than heavy clothing</li>
            <li>• Avoid new shoes just before treks</li>
            <li>• Carry medicines even for minor issues</li>
            <li>• Pack light — hill travel involves walking</li>
          </ul>
        </section>

        {/* CTA */}
        <div
          className="bg-white rounded-2xl p-10 border text-center"
          style={{ borderColor: GOLD }}
        >
          <h3 className="text-2xl font-semibold mb-3">
            Planning a trek or itinerary?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore curated treks & trips with packing guidance included.
          </p>
          <button
            className="px-8 py-3 rounded-xl text-white"
            style={{ background: GOLD }}
          >
            Explore Treks & Trips
          </button>
        </div>
      </section>
    </div>
  );
}

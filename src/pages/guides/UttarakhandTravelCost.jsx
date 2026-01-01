// src/pages/guides/UttarakhandTravelCost.jsx
import { motion } from "framer-motion";

const GOLD = "#C59D5F";
const GRAY = "#D1D5DB"; // Light gray for underlines

/* ================= COST DATA ================= */

const COST_TIERS = [
  {
    title: "Budget Traveller",
    range: "₹1,200 – ₹2,500 / day",
    bestFor: "Backpackers, students, solo travellers",
    includes: [
      "Budget homestays or hostels",
      "Local buses & shared taxis",
      "Simple local food",
      "Short hikes & free attractions",
    ],
    note:
      "Ideal if you’re flexible with comfort and want to experience Uttarakhand slowly and economically.",
    dailyCosts: {
      food: "₹300 – ₹600 / day",
      transport: "₹500 – ₹1,000 / day",
      stay: "₹800 – ₹2,000 / night",
      treks: "₹2,500 – ₹5,000",
      activities: "₹500 – ₹1,500",
    },
  },
  {
    title: "Mid-Range Traveller",
    range: "₹3,000 – ₹6,000 / day",
    bestFor: "Families, couples",
    includes: [
      "Comfortable hotels or premium homestays",
      "Private taxis for local travel",
      "Restaurants & cafes",
      "Guided sightseeing & short treks",
    ],
    note:
      "The most popular travel style — balanced comfort, flexibility, and value.",
    dailyCosts: {
      food: "₹600 – ₹1,200 / day",
      transport: "₹1,000 – ₹2,000 / day",
      stay: "₹2,000 – ₹4,000 / night",
      treks: "₹3,000 – ₹7,000",
      activities: "₹1,000 – ₹2,500",
    },
  },
  {
    title: "Luxury Traveller",
    range: "₹8,000 – ₹15,000+ / day",
    bestFor: "Luxury seekers, special occasions",
    includes: [
      "Resorts & boutique stays",
      "Private chauffeurs",
      "Curated experiences",
      "Personal guides & premium activities",
    ],
    note:
      "For travellers who prefer privacy, premium stays, and curated mountain experiences.",
    dailyCosts: {
      food: "₹1,200 – ₹2,500 / day",
      transport: "₹2,000 – ₹5,000 / day",
      stay: "₹5,000 – ₹12,000 / night",
      treks: "₹5,000 – ₹12,000",
      activities: "₹2,000 – ₹3,500",
    },
  },
];

const COMMON_COSTS = [
  { label: "Food", value: "" },
  { label: "Local Transport", value: "" },
  { label: "Stay", value: "" },
  { label: "Treks", value: "" },
  { label: "Activities", value: "" },
];

/* ================= PAGE ================= */

export default function UttarakhandTravelCost() {
  return (
    <div className="bg-[#fff7e6] min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
          alt="Uttarakhand travel cost"
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
              Uttarakhand Travel Cost
            </motion.h1>
            <p className="text-lg text-white/90 max-w-2xl">
              A realistic breakdown of how much it costs to travel Uttarakhand — from budget trips to luxury mountain escapes.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-6 py-20 space-y-28 mx-6">

        {/* COST TIERS */}
        {COST_TIERS.map((tier, i) => (
          <motion.section
            key={tier.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-14 items-center"
          >
            {/* TEXT */}
            <div className={i % 2 ? "md:order-2" : ""}>
              <div className="pl-6 border-l-4" style={{ borderColor: GOLD }}>
                <h3 className="text-3xl font-semibold mb-2">{tier.title}</h3>

                <p className="text-xl font-medium mb-4" style={{ color: GOLD }}>
                  {tier.range}
                </p>

                <p className="text-gray-700 mb-4">
                  <strong>Best for:</strong> {tier.bestFor}
                </p>

                <ul className="text-gray-700 space-y-2 mb-4">
                  {tier.includes.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>

                <p className="text-sm text-gray-600 italic">{tier.note}</p>
              </div>
            </div>

            {/* VISUAL */}
            <div className={i % 2 ? "md:order-1" : ""}>
              <div className="bg-white rounded-2xl p-8 border shadow-sm border-gray-300">
                <h4 className="text-lg font-semibold mb-4" style={{ color: GOLD }}>
                  Typical daily expenses
                </h4>

                <div className="space-y-3 text-sm">
                  {Object.entries(tier.dailyCosts).map(([key, cost]) => (
                    <div
                      key={key}
                      className="flex justify-between border-b pb-2"
                      style={{ borderBottomColor: GRAY }} // Set underline to gray
                    >
                      <span className="text-gray-600 capitalize">{key}</span>
                      <span className="font-medium">{cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* ================= TIPS ================= */}
        <div className="bg-white rounded-2xl p-10 border" style={{ borderColor: GOLD }}>
          <h3 className="text-2xl font-semibold mb-4">Money-Saving Tips</h3>
          <ul className="text-gray-700 space-y-2">
            <li>• Travel during shoulder seasons (March & September)</li>
            <li>• Book treks & stays together for package discounts</li>
            <li>• Use shared taxis in hill towns</li>
            <li>• Avoid peak holiday weekends</li>
          </ul>
        </div>

        {/* ================= CTA ================= */}
        <div className="bg-white rounded-2xl p-10 border text-center" style={{ borderColor: GOLD }}>
          <h3 className="text-2xl font-semibold mb-3">Planning within a budget?</h3>
          <p className="text-gray-600 mb-6">
            Find treks, stays & itineraries that match your budget.
          </p>
          <button
            className="px-8 py-3 rounded-xl text-white"
            style={{ background: GOLD }}
          >
            Explore Budget-Friendly Trips
          </button>
        </div>
      </section>
    </div>
  );
}

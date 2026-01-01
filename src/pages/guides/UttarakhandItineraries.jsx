// src/pages/guides/UttarakhandItineraries.jsx
import { motion } from "framer-motion";

const GOLD = "#C59D5F";

/* ================= ITINERARY DATA ================= */

const ITINERARIES = [
  {
    days: "3 Days",
    title: "Rishikesh & Haridwar (Spiritual + Relaxed)",
    image:
      "https://luxoticholidays.com/blog/wp-content/uploads/2024/11/Haridwar-to-rishikesh.jpg",
    bestFor: "First-time visitors, short trips",
    season: "Oct – Apr",
    plan: [
      "Day 1: Arrive in Haridwar, attend evening Ganga Aarti",
      "Day 2: Rishikesh sightseeing, yoga, cafes, river walk",
      "Day 3: Adventure activities or temple visits, departure",
    ],
    desc: "This short itinerary is ideal for travellers looking to experience Uttarakhand’s spiritual essence without long travel times. It balances peaceful river moments with light adventure and cultural exploration.",
  },
  {
    days: "5 Days",
    title: "Nainital & Mussoorie (Hill Stations)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/aa/Mussoorie_landscape.jpg",
    bestFor: "Families, couples",
    season: "Mar – Jun · Sep – Oct",
    plan: [
      "Day 1: Reach Nainital, lake walk & local markets",
      "Day 2: Nainital sightseeing (Snow View, Bhimtal)",
      "Day 3: Drive to Mussoorie via scenic routes",
      "Day 4: Mussoorie sightseeing, Kempty Falls",
      "Day 5: Departure",
    ],
    desc: "A classic hill-station itinerary covering Uttarakhand’s most loved towns. Perfect for relaxed vacations with scenic viewpoints, pleasant weather, and easy travel.",
  },
  {
    days: "7 Days",
    title: "Garhwal Himalayas (Nature + Culture)",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Har_Ki_Dun.jpg",
    bestFor: "Nature lovers, slow travellers",
    season: "Apr – Jun · Sep – Nov",
    plan: [
      "Day 1: Dehradun to Mussoorie",
      "Day 2: Mussoorie sightseeing",
      "Day 3: Drive to Chopta",
      "Day 4: Tungnath–Chandrashila trek",
      "Day 5: Drive to Rishikesh",
      "Day 6: Rishikesh adventure & yoga",
      "Day 7: Departure",
    ],
    desc: "This itinerary is designed for travellers who want a deeper Himalayan experience — combining scenic drives, short treks, temples, and river towns.",
  },
];

/* ================= PAGE ================= */

export default function UttarakhandItineraries() {
  return (
    <div className="bg-[#fff7e6] min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[420px]">
        <img
          src="https://lp-cms-production.imgix.net/2022-03/GettyRF_956963154.jpg"
          alt="Uttarakhand itinerary"
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
              Uttarakhand Itineraries
            </motion.h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Carefully crafted 3, 5 & 7 day travel plans — covering
              spirituality, hill stations, treks & nature.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-6 py-20 space-y-28 mx-6">
        {ITINERARIES.map((it, i) => (
          <motion.section
            key={it.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-14 items-center"
          >
            {/* TEXT */}
            <div className={i % 2 ? "md:order-2" : ""}>
              <div className="pl-6 border-l-4" style={{ borderColor: GOLD }}>
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {it.days} itinerary
                </span>

                <h3 className="text-3xl font-semibold mt-2 mb-4">{it.title}</h3>

                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  <Tag label={`Best for: ${it.bestFor}`} />
                  <Tag label={`Season: ${it.season}`} />
                </div>

                <p className="text-gray-700 leading-relaxed mb-5">{it.desc}</p>

                <ul className="text-sm text-gray-700 space-y-2">
                  {it.plan.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* IMAGE */}
            <div className={i % 2 ? "md:order-1" : ""}>
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img
                  src={it.image}
                  alt={it.title}
                  className="h-96 w-full object-cover transition duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.section>
        ))}

        {/* ================= CTA ================= */}
        <div className="bg-white rounded-2xl p-10 border text-center border-[#C5BC42]">
          <h3 className="text-2xl font-semibold mb-3">
            Want a custom itinerary?
          </h3>
          <p className="text-gray-600 mb-6">
            Get personalized travel plans based on budget, season, and travel
            style.
          </p>
          <button
            className="px-8 py-3 rounded-xl text-white"
            style={{ background: GOLD }}
          >
            Build My Trip
          </button>
        </div>
      </section>
    </div>
  );
}

/* ================= HELPERS ================= */

function Tag({ label }) {
  return (
    <span
      className="px-3 py-1 rounded-full border bg-[#fffdf8] text-gray-700"
      style={{ borderColor: GOLD }}
    >
      {label}
    </span>
  );
}

// src/pages/guides/UttarakhandTravelTips.jsx
import { motion } from "framer-motion";

const GOLD = "#C59D5F";

/* ================= DATA ================= */

const SAFETY_TIPS = [
  "Check weather & road conditions daily, especially during monsoon",
  "Avoid night driving in hilly areas",
  "Inform hotel or locals before heading to remote places",
  "Keep emergency contacts saved offline",
  "Respect forest & wildlife rules",
];

const HEALTH_TIPS = [
  "Acclimatize properly at higher altitudes",
  "Stay hydrated but avoid overexertion",
  "Carry basic medicines for headache, cold & stomach issues",
  "Avoid alcohol at high altitude",
  "Eat light meals during treks",
];

const MONEY_TIPS = [
  "Carry sufficient cash — ATMs are limited in remote areas",
  "UPI works in towns but may fail in villages",
  "Confirm inclusions before booking taxis or treks",
  "Avoid advance payments to unknown operators",
];

const PERMITS_INFO = [
  {
    title: "Trekking Permits",
    desc: "Some treks like Valley of Flowers or protected forest routes require permits. These are usually arranged by registered trek operators or can be obtained locally from forest offices.",
  },
  {
    title: "Char Dham Yatra Registration",
    desc: "Online registration is mandatory for Kedarnath, Badrinath, Gangotri & Yamunotri. Carry digital & printed copies.",
  },
  {
    title: "Inner Line & Forest Rules",
    desc: "Camping or drones may be restricted in forest zones. Always check local regulations before planning.",
  },
];

const NETWORK_INFO = [
  "Jio & BSNL work best in Uttarakhand",
  "Expect no signal during treks or deep valleys",
  "Download offline maps before travel",
  "Inform family in advance about network gaps",
];

/* ================= PAGE ================= */

export default function UttarakhandTravelTips() {
  return (
    <div className="bg-[#fff7e6] min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[420px]">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1cc5TbBNlH4vzoRj2Mh7l8zGmJN7jlEboA&s"
          alt="Uttarakhand travel tips"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />

        <div className="relative h-full flex items-center px-6 mx-6">
          <div className=" max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Uttarakhand Travel Tips
            </motion.h1>
            <p className="text-lg text-white/90">
              Safety, permits, health & smart travel advice — everything you
              should know before visiting Uttarakhand.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-6 py-20 space-y-28 mx-6">
        {/* SAFETY */}
        <InfoSection title="Safety & Local Awareness" points={SAFETY_TIPS} />

        {/* HEALTH */}
        <InfoSection title="Health & Altitude Tips" points={HEALTH_TIPS} />

        {/* MONEY */}
        <InfoSection title="Money & Payments" points={MONEY_TIPS} />

        {/* PERMITS */}
        <section className="bg-white rounded-2xl p-10 border border-[#C59D5F]/40 shadow-sm hover:shadow-md transition space-y-6">
          <h2 className="text-2xl font-semibold" style={{ color: GOLD }}>
            Permits & Registrations
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {PERMITS_INFO.map((p) => (
              <div key={p.title}>
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-gray-700 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NETWORK */}
        <InfoSection title="Mobile Network & Internet" points={NETWORK_INFO} />

        {/* CULTURE */}
        <section className="bg-white rounded-2xl p-10 border border-[#C59D5F]/40 shadow-sm hover:shadow-md transition space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Respect Local Culture</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Dress modestly near temples & villages</li>
            <li>• Avoid loud music in natural areas</li>
            <li>• Ask before photographing locals</li>
            <li>• Keep Uttarakhand clean — carry back waste</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-2xl p-10 border border-[#C59D5F]/40 shadow-sm hover:shadow-md transition space-y-6">
          <h3 className="text-2xl font-semibold mb-3">
            Ready to plan your Uttarakhand trip?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore treks, itineraries & trusted local hosts.
          </p>
          <button
            className="px-8 py-3 rounded-xl text-white"
            style={{ background: GOLD }}
          >
            Explore Trips & Treks
          </button>
        </section>
      </section>
    </div>
  );
}

/* ================= COMPONENT ================= */

function InfoSection({ title, points }) {
  return (
    <section className="bg-white rounded-2xl p-10 border border-[#C59D5F]/40 shadow-sm hover:shadow-md transition">
      <h2
        className="text-2xl font-semibold mb-6 flex items-center gap-3"
        style={{ color: GOLD }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
        {title}
      </h2>

      <ul className="space-y-3 text-gray-700">
        {points.map((p) => (
          <li key={p} className="flex gap-3">
            <span className="mt-1 text-[#C59D5F]">●</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

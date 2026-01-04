import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiDollarSign,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiStar,
  FiCheckCircle,
  FiMapPin,
  FiActivity,
  FiGlobe
} from "react-icons/fi";

/* --- Reusable Feature Card --- */
const FeatureCard = ({ icon: Icon, title, children }) => (
  <div className="bg-white p-6 rounded-2xl border border-[#f2e3b6] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-start text-left group">
    <div className="p-3 rounded-xl bg-[#fff9e6] text-[#b8860b] mb-4 group-hover:bg-[#b8860b] group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-[#b8860b] mb-3">{title}</h3>
    <div className="text-gray-600 leading-relaxed text-sm flex-grow">
      {children}
    </div>
  </div>
);

/* --- Category List Item --- */
const CategoryItem = ({ title, items }) => (
  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-[#f2e3b6] shadow-sm hover:shadow-md transition duration-300">
    <h4 className="font-bold text-lg text-[#b8860b] mb-4 flex items-center gap-2">
      <FiCheckCircle className="shrink-0" />
      {title}
    </h4>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start text-sm text-gray-700">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 mr-2 shrink-0"></span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function ForHost() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#fffaf3] to-white text-gray-800">

      {/* HEADER SPLASH */}
      <section className="pt-24 pb-12 text-center relative overflow-hidden px-4">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#fff6dc] rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="inline-block px-6 py-2 mb-6 rounded-full bg-white text-sm font-semibold tracking-wider uppercase shadow-md border border-[#d4af37] text-[#b8860b]">
          Become a Host
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[#b8860b] mb-6 tracking-tight">Turn Your Passion Into Income</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          At Athithya, we believe every local has a story, a skill, or a space
          that can inspire a traveller’s journey. Turn what you love into memorable experiences with zero investment.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-10 space-y-20 pb-24">

        {/* SECTION 1: WHY HOST (Grid Layout) */}
        <section>
          <h2 className="text-3xl font-bold text-center text-[#5F5646] mb-12">Why Host on Athithya?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={FiDollarSign} title="Zero Investment">
              Athithya empowers locals to earn from what they already have — their
              space, skills, culture, and local knowledge — without investment or
              the need to build an audience.
            </FeatureCard>

            <FeatureCard icon={FiHome} title="Monetize Your Assets">
              From a spare room to a unique skill, local cuisine, adventure
              expertise, or cultural knowledge — you can transform your local
              strengths into a source of income without spending money or running ads.
            </FeatureCard>

            <FeatureCard icon={FiSettings} title="You Control Everything">
              <ul className="space-y-1 mb-2 font-medium">
                <li>• Your price</li>
                <li>• Your timings</li>
                <li>• Your rules</li>
              </ul>
              No boss. No targets. No pressure. Host full-time, part-time,
              weekends-only, or seasonally — completely on your terms.
            </FeatureCard>

            <FeatureCard icon={FiShield} title="Secure & Verified">
              Athithya ensures secure payments, identity verification, and
              transparent processes so you can focus on hosting — not worrying.
            </FeatureCard>

            <FeatureCard icon={FiTrendingUp} title="Free Marketing">
              We bring travellers to you. You don’t need to spend a single rupee on
              advertising — Athithya handles discovery, visibility, and reach.
            </FeatureCard>

            <FeatureCard icon={FiStar} title="Easy to Start">
              <ul className="space-y-1 mb-2 font-medium">
                <li>• List your stay or experience in minutes</li>
                <li>• No contracts</li>
                <li>• No investment</li>
                <li>• No complexity</li>
              </ul>
              Start earning as travellers accept your invitations.
            </FeatureCard>
          </div>
        </section>

        {/* SECTION 2: WHAT CAN YOU HOST */}
        <section className="relative">
          <div className="absolute inset-0 bg-[#fff9e6] -skew-y-1 -z-10 rounded-3xl transform scale-105 opacity-50"></div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5F5646]">What Can You Host?</h2>
            <p className="text-gray-500 mt-2">If it’s authentic and adds value, you can host it.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryItem
              title="Local Stays"
              items={['Homestays', 'Village stays', 'Farm stays', 'Unique accommodations']}
            />
            <CategoryItem
              title="Experiences"
              items={['Cooking classes', 'Cultural walks', 'Workshops, art & music', 'Local traditions']}
            />
            <CategoryItem
              title="Adventures"
              items={['Trekking & Camping', 'Rafting', 'Nature trails', 'Paragliding, kayaking']}
            />
            <CategoryItem
              title="Services"
              items={['Commute & pick-up drops', 'Bike rentals', 'Custom travel trips', 'Guided tours']}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="inline-block px-6 py-2 bg-white rounded-full border border-[#d4af37] text-[#b8860b] font-medium text-sm shadow-sm">
              <FiGlobe className="inline mr-2 mb-0.5" />
              Anything authentic & local that adds value to a traveller’s journey.
            </p>
          </div>
        </section>

        {/* SECTION 3: CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-[#b8860b] to-[#d4af37] rounded-3xl p-10 md:p-16 text-white shadow-xl relative overflow-hidden">
            {/* Texture bubbles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                You pick the price. You decide when to host. You keep the earnings.<br />
                Join the community of locals shaping the future of travel.
              </p>

              <button
                onClick={() => navigate("?auth=signup&role=host")}
                className="inline-flex items-center gap-2 bg-white text-[#b8860b] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Be a Local Host</span>
                <FiCheckCircle />
              </button>

              <p className="mt-6 text-sm opacity-70">
                Empowering locals. Creating meaningful travel experiences.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

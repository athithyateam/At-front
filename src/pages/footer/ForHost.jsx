import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiDollarSign,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiStar,
} from "react-icons/fi";

const Section = ({ icon: Icon, title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="mb-10 text-left"
  >
    <h2 className="flex items-center gap-3 text-xl font-semibold text-[#C9A24D] mb-4 text-left">
      <Icon className="text-[#C9A24D]" />
      {title}
    </h2>
    <div className="text-gray-700 leading-relaxed text-sm space-y-4 text-left">
      {children}
    </div>
  </motion.section>
);

export default function ForHost() {
  const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen px-4 py-10 mt-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8 sm:p-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10 border-b pb-6"
        >
          <div className="flex justify-between items-start flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-[#C9A24D]">
              For Hosts
            </h1>
          </div>
          <p className="text-gray-700 text-sm mt-6">
            At Athithya, we believe every local has a story, a skill, or a space
            that can inspire a traveller’s journey. Whether you’re a homestay
            owner, have a spare room, cook authentic local dishes, guide treks,
            run adventure activities, create cultural experiences, host events,
            or simply know your place better than Google Maps — Athithya welcomes
            you to turn what you love into memorable experiences while earning
            income with zero investment.
          </p>
        </motion.div>

        {/* Why Host */}
        <Section icon={FiDollarSign} title="Why Host on Athithya?">
          <p>
            Athithya empowers locals to earn from what they already have — their
            space, skills, culture, and local knowledge — without investment or
            the need to build an audience.
          </p>
        </Section>

        <Section icon={FiHome} title="Earn From What You Already Have">
          <p>
            From a spare room to a unique skill, local cuisine, adventure
            expertise, or cultural knowledge — you can transform your local
            strengths into a source of income without spending money or running
            ads.
          </p>
        </Section>

        <Section icon={FiSettings} title="You Control Everything">
          <ul className="list-disc pl-5 space-y-1">
            <li>Your price</li>
            <li>Your timings</li>
            <li>Your rules</li>
          </ul>
          <p>
            No boss. No targets. No pressure. Host full-time, part-time,
            weekends-only, or seasonally — completely on your terms.
          </p>
        </Section>

        <Section icon={FiShield} title="Secure Payments & Verified Guests">
          <p>
            Athithya ensures secure payments, identity verification, and
            transparent processes so you can focus on hosting — not worrying.
          </p>
        </Section>

        <Section icon={FiTrendingUp} title="Free Marketing & Exposure">
          <p>
            We bring travellers to you. You don’t need to spend a single rupee on
            advertising — Athithya handles discovery, visibility, and reach.
          </p>
        </Section>

        <Section icon={FiStar} title="Start Earning Now">
          <ul className="list-disc pl-5 space-y-1">
            <li>List your stay or experience in minutes</li>
            <li>Start earning as travellers accept your invitations</li>
            <li>No contracts</li>
            <li>No investment</li>
            <li>No complexity</li>
          </ul>
        </Section>

        {/* What Can You Host */}
        <Section icon={FiHome} title="What Can You Host?">
          <p><strong>Local Stays:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Homestays</li>
            <li>Village stays</li>
            <li>Farm stays</li>
            <li>Unique accommodations</li>
          </ul>

          <p><strong>Experiences:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cooking classes</li>
            <li>Cultural walks</li>
            <li>Workshops, art & music</li>
          </ul>

          <p><strong>Adventure Activities:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Trekking</li>
            <li>Rafting</li>
            <li>Camping</li>
            <li>Paragliding, kayaking, bungee jumping</li>
          </ul>

          <p><strong>Guided Experiences:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>City tours</li>
            <li>Heritage walks</li>
            <li>Nature trails</li>
          </ul>

          <p><strong>Local Services:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Commute & pick-up drops</li>
            <li>Bike rentals</li>
            <li>Custom travel trips</li>
          </ul>

          <p>
            <strong>Anything authentic & local:</strong>
            If it’s genuine and adds value to a traveller’s journey, you can host it.
          </p>

          <p>
            You pick the price. You decide when to host. You keep the earnings.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-16 text-center text-sm font-medium text-[#C9A24D]">
          Still thinking? <br />
          <span
            onClick={() => navigate("?auth=signup&role=host")}
            className="font-bold underline cursor-pointer hover:text-[#b08d42]"
          >
            Be a Local Host at Athithya.
          </span>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Empowering locals. Creating meaningful travel experiences.
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiDollarSign,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiStar,
} from "react-icons/fi";

/* 🎨 Gold palette (inline – no tailwind config dependency) */
const GOLD = "#C9A24D";
const TEXT_PRIMARY = "#5F5646";
const TEXT_SECONDARY = "#7A715E";
const TEXT_LIST = "#6B614E";
const TEXT_MUTED = "#9A8F79";

const Section = ({ icon: Icon, title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    viewport={{ once: true }}
    className="mb-14"
  >
    <h2
      className="flex items-center gap-3 text-lg md:text-xl font-semibold mb-4"
      style={{ color: GOLD }}
    >
      <span
        className="p-2 rounded-xl"
        style={{ backgroundColor: `${GOLD}1A` }}
      >
        <Icon style={{ color: GOLD }} />
      </span>
      {title}
    </h2>

    <div
      className="text-sm leading-relaxed space-y-3"
      style={{ color: TEXT_PRIMARY }}
    >
      {children}
    </div>
  </motion.section>
);

export default function ForHost() {
  return (
    <div
      className="bg-white min-h-screen px-4 py-14 mt-10"
      style={{ color: TEXT_PRIMARY }}
    >
      <div
        className="max-w-8xl mx-6 bg-white shadow-sm rounded-2xl p-8"
        style={{ border: `1px solid ${GOLD}33` }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ color: GOLD }}
          >
            For Hosts
          </h1>

          <p
            className="text-sm md:text-base mt-4 max-w-3xl"
            style={{ color: TEXT_SECONDARY }}
          >
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
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
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
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
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
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Homestays</li>
            <li>Village stays</li>
            <li>Farm stays</li>
            <li>Unique accommodations</li>
          </ul>

          <p className="mt-4"><strong>Experiences:</strong></p>
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Cooking classes</li>
            <li>Cultural walks</li>
            <li>Workshops, art & music</li>
          </ul>

          <p className="mt-4"><strong>Adventure Activities:</strong></p>
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Trekking</li>
            <li>Rafting</li>
            <li>Camping</li>
            <li>Paragliding, kayaking, bungee jumping</li>
          </ul>

          <p className="mt-4"><strong>Guided Experiences:</strong></p>
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>City tours</li>
            <li>Heritage walks</li>
            <li>Nature trails</li>
          </ul>

          <p className="mt-4"><strong>Local Services:</strong></p>
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Commute & pick-up drops</li>
            <li>Bike rentals</li>
            <li>Custom travel trips</li>
          </ul>

          <p className="mt-4">
            <strong>Anything authentic & local:</strong>  
            If it’s genuine and adds value to a traveller’s journey, you can host it.
          </p>

          <p className="mt-3">
            You pick the price. You decide when to host. You keep the earnings.
          </p>
        </Section>

        {/* CTA */}
        <div
          className="mt-16 text-center text-sm font-medium"
          style={{ color: GOLD }}
        >
          Still thinking? <br />
          Be a Local Host at Athithya.
        </div>

        {/* Footer */}
        <div
          className="mt-10 text-center text-xs"
          style={{ color: TEXT_MUTED }}
        >
          Empowering locals. Creating meaningful travel experiences.
        </div>
      </div>
    </div>
  );
}

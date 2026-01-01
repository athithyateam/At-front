import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiMessageCircle,
  FiUserCheck,
  FiMapPin,
  FiEye,
  FiAlertTriangle,
  FiLock,
} from "react-icons/fi";

/* 🎨 Gold palette (defined here, no tailwind config needed) */
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
    className="mb-12"
  >
    <h2
      className="flex items-center gap-3 text-lg md:text-xl font-semibold mb-4"
      style={{ color: GOLD }}
    >
      <span
        className="p-2 rounded-xl"
        style={{ backgroundColor: `${GOLD}1A` }} // gold @10%
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

export default function Safety() {
  return (
    <div
      className="bg-white min-h-screen px-4 py-14 mt-10"
      style={{ color: TEXT_PRIMARY }}
    >
      <div
        className="max-w-8xl mx-6 bg-white shadow-sm rounded-2xl p-8"
        style={{ border: `1px solid ${GOLD}33` }} // gold @20%
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ color: GOLD }}
          >
            Safety at Athithya
          </h1>

          <p
            className="text-sm md:text-base mt-4 max-w-3xl"
            style={{ color: TEXT_SECONDARY }}
          >
            At Athithya, trust and safety are at the core of everything we do.
            Whether you are a traveller or a host, we are committed to providing
            a secure, transparent, and respectful environment for every
            interaction on our platform. Your safety is our priority — and
            protecting it is a shared responsibility.
          </p>
        </motion.div>

        <Section icon={FiMessageCircle} title="Private Messaging Before You Meet">
          <p>
            Communicate securely within the Athithya platform before accepting
            any invitation or plan. Clearly discuss:
          </p>
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Questions and expectations</li>
            <li>Plans and schedules</li>
            <li>Meeting points and safety details</li>
          </ul>
          <p>
            All of this can be done without sharing your personal phone number.
          </p>
        </Section>

        <Section
          icon={FiUserCheck}
          title="Control Over Invites & Connections"
        >
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Accept or decline invitations</li>
            <li>Report suspicious profiles</li>
            <li>Block unwanted interactions</li>
            <li>Limit profile visibility</li>
          </ul>
        </Section>

        <Section icon={FiShield} title="Community Guidelines & Conduct">
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Respect local cultures and traditions</li>
            <li>Zero tolerance for harassment or discrimination</li>
            <li>No illegal or unsafe activities</li>
            <li>No behavior that puts others at risk</li>
          </ul>
        </Section>

        <Section icon={FiMapPin} title="Secure & Transparent Locations">
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Verified maps and meeting points</li>
            <li>Clear activity descriptions</li>
            <li>Disclosed safety and risk levels</li>
          </ul>
        </Section>

        <Section icon={FiEye} title="Check Profiles, Reviews & Verification">
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Ratings and reviews</li>
            <li>Profile photos</li>
            <li>Verification badges</li>
            <li>Past experiences</li>
          </ul>
        </Section>

        <Section icon={FiLock} title="Route Sharing & Live Location">
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Share route details</li>
            <li>Enable live location for booked experiences</li>
          </ul>
        </Section>

        <Section icon={FiAlertTriangle} title="Zero-Tolerance Safety Policy">
          <ul className="list-disc ml-5" style={{ color: TEXT_LIST }}>
            <li>Immediate account suspension</li>
            <li>Permanent platform ban</li>
            <li>Legal escalation if required</li>
          </ul>
        </Section>

        {/* Footer */}
        <div
          className="mt-16 text-center text-xs"
          style={{ color: TEXT_MUTED }}
        >
          Safety is a shared responsibility. Travel responsibly with Athithya.
        </div>
      </div>
    </div>
  );
}

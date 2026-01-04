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

export default function Safety() {
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
              Safety at Athithya
            </h1>
          </div>
          <p className="text-gray-700 text-sm mt-6">
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
          <ul className="list-disc pl-5 space-y-1">
            <li>Questions and expectations</li>
            <li>Plans and schedules</li>
            <li>Meeting points and safety details</li>
          </ul>
          <p>
            All of this can be done without sharing your personal phone number.
          </p>
        </Section>

        <Section icon={FiUserCheck} title="Control Over Invites & Connections">
          <ul className="list-disc pl-5 space-y-1">
            <li>Accept or decline invitations</li>
            <li>Report suspicious profiles</li>
            <li>Block unwanted interactions</li>
            <li>Limit profile visibility</li>
          </ul>
        </Section>

        <Section icon={FiShield} title="Community Guidelines & Conduct">
          <ul className="list-disc pl-5 space-y-1">
            <li>Respect local cultures and traditions</li>
            <li>Zero tolerance for harassment or discrimination</li>
            <li>No illegal or unsafe activities</li>
            <li>No behavior that puts others at risk</li>
          </ul>
        </Section>

        <Section icon={FiMapPin} title="Secure & Transparent Locations">
          <ul className="list-disc pl-5 space-y-1">
            <li>Verified maps and meeting points</li>
            <li>Clear activity descriptions</li>
            <li>Disclosed safety and risk levels</li>
          </ul>
        </Section>

        <Section icon={FiEye} title="Check Profiles, Reviews & Verification">
          <ul className="list-disc pl-5 space-y-1">
            <li>Ratings and reviews</li>
            <li>Profile photos</li>
            <li>Verification badges</li>
            <li>Past experiences</li>
          </ul>
        </Section>

        <Section icon={FiLock} title="Route Sharing & Live Location">
          <ul className="list-disc pl-5 space-y-1">
            <li>Share route details</li>
            <li>Enable live location for booked experiences</li>
          </ul>
        </Section>

        <Section icon={FiAlertTriangle} title="Zero-Tolerance Safety Policy">
          <ul className="list-disc pl-5 space-y-1">
            <li>Immediate account suspension</li>
            <li>Permanent platform ban</li>
            <li>Legal escalation if required</li>
          </ul>
        </Section>

        <div className="mt-12 text-center text-xs text-gray-500">
          Safety is a shared responsibility.
        </div>
      </div>
    </div>
  );
}

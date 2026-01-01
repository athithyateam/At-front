import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiUser,
  FiCreditCard,
  FiAlertTriangle,
  FiFileText,
  FiGlobe,
} from "react-icons/fi";

const Section = ({ icon: Icon, title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="mb-10"
  >
    <h2 className="flex items-center gap-3 text-xl font-semibold text-[#C9A24D] mb-3">
      <Icon className="text-[#C9A24D]" />
      {title}
    </h2>
    <div className="text-gray-700 leading-relaxed space-y-2 text-sm">
      {children}
    </div>
  </motion.section>
);

export default function Terms() {
  return (
    <div className="bg-white min-h-screen px-4 py-10 mt-12">
      <div className="max-w-8xl mx-6 bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-[#C9A24D]">
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: 01 January 2026
          </p>
        </motion.div>

        {/* Intro */}
        <p className="text-gray-700 text-sm mb-8">
          Welcome to <strong>Athithya</strong>, a travel experience platform
          combining local hosting with social interaction. By accessing or using
          Athithya, you agree to be bound by these Terms & Conditions.
        </p>

        {/* Sections */}
        <Section icon={FiFileText} title="1. Acceptance of Terms">
          <p>
            By registering or using Athithya, you confirm that you are at least
            18 years old and legally capable of entering into this agreement. If
            you do not agree to any part of these terms, you may not access or
            use the platform.
          </p>
        </Section>

        <Section icon={FiGlobe} title="2. Platform Role & Services">
          <p>
            Athithya operates solely as an online intermediary platform that
            connects travelers with independent hosts. We do not own, operate,
            manage, or control any accommodation, experience, tour, or service.
          </p>
          <ul className="list-disc ml-5">
            <li>Social media sharing of travel posts & plans</li>
            <li>Marketplace for local stays, cuisines & experiences</li>
          </ul>
        </Section>

        <Section icon={FiUser} title="3. User Responsibilities">
          <p><strong>All Users:</strong></p>
          <ul className="list-disc ml-5">
            <li>Provide accurate information</li>
            <li>No harmful, offensive, or illegal content</li>
            <li>Respect privacy and rights of others</li>
          </ul>

          <p className="mt-3"><strong>Hosts:</strong></p>
          <ul className="list-disc ml-5">
            <li>Accurate service descriptions & pricing</li>
            <li>Comply with local laws & tax regulations</li>
          </ul>

          <p className="mt-3"><strong>Travelers:</strong></p>
          <ul className="list-disc ml-5">
            <li>Respect host rules and property</li>
            <li>Provide honest reviews</li>
          </ul>
        </Section>

        <Section icon={FiShield} title="4. Content Policy">
          <p>
            You retain ownership of your content but grant Athithya a
            non-exclusive, royalty-free, worldwide license to use, display, and
            promote it.
          </p>
          <p>
            We reserve the right to remove content violating policies or legal
            standards.
          </p>
        </Section>

        <Section icon={FiCreditCard} title="5. Payments & Fees">
          <ul className="list-disc ml-5">
            <li>Payments are processed via secure third-party providers</li>
            <li>Service fees are disclosed during checkout</li>
            <li>Hosts are responsible for applicable taxes</li>
          </ul>
          <p className="mt-2">
            Refunds are initiated promptly; actual credit time depends on bank
            TAT.
          </p>
        </Section>

        <Section icon={FiAlertTriangle} title="6. Cancellation & Refund Policy">
          <ul className="list-disc ml-5">
            <li>Within 1 hour of booking – 100% refund</li>
            <li>More than 72 hours before check-in – 70% refund</li>
            <li>Within 72 hours of check-in – Non-refundable</li>
          </ul>
        </Section>

        <Section icon={FiShield} title="7. Community Guidelines">
          <ul className="list-disc ml-5">
            <li>Respect cultural differences</li>
            <li>No harassment, discrimination, or exploitation</li>
            <li>Violations may result in suspension or termination</li>
          </ul>
        </Section>

        <Section icon={FiAlertTriangle} title="8. Limitation of Liability">
          <p>
            Athithya shall not be liable for indirect, incidental, or
            consequential damages including personal injury, misconduct,
            downtime, or data loss. Total liability shall not exceed the service
            fee paid for the booking.
          </p>
        </Section>

        <Section icon={FiShield} title="9. Assumption of Risk">
          <p>
            Travel involves inherent risks. Users voluntarily assume all risks.
            Athithya does not guarantee safety, quality, or suitability of any
            experience or user.
          </p>
        </Section>

        <Section icon={FiUser} title="10. Identity Verification">
          <p>
            Athithya may offer optional or mandatory identity verification.
            Verification badges do not guarantee conduct or safety. Users are
            responsible for their interactions.
          </p>
        </Section>

        <Section icon={FiFileText} title="11. Governing Law & Dispute Resolution">
          <p>
            These Terms are governed by the laws of India. Disputes shall be
            resolved via arbitration under the Arbitration & Conciliation Act,
            1996. Seat: Dehradun, Uttarakhand.
          </p>
        </Section>

        <Section icon={FiFileText} title="12. Modifications">
          <p>
            Athithya may update these Terms at any time. Continued use implies
            acceptance of revised terms.
          </p>
        </Section>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Athithya. All rights reserved.
        </div>
      </div>
    </div>
  );
}

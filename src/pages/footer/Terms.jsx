import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiUser,
  FiCreditCard,
  FiAlertTriangle,
  FiFileText,
  FiGlobe,
  FiLock,
  FiClock,
  FiLayout,
} from "react-icons/fi";

const Section = ({ icon: Icon, title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="mb-10"
  >
    <h2 className="flex items-center gap-3 text-xl font-semibold text-[#C9A24D] mb-4">
      <Icon className="text-[#C9A24D]" />
      {title}
    </h2>
    <div className="text-gray-700 leading-relaxed text-sm space-y-4">
      {children}
    </div>
  </motion.section>
);

export default function Terms() {
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
              Terms and Conditions – Athithya
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Last Updated: 01-Jan-26
            </p>
          </div>
          <p className="text-gray-700 text-sm mt-6">
            Welcome to Athithya, a travel experience platform that seamlessly combines the warmth of local hosting with the interactivity of social media, offering everyone a complete, meaningful and immersive traveling experience. By accessing or using our website or application, you agree to be bound by these Terms and Conditions.
          </p>
        </motion.div>

        {/* Platform Role */}
        <Section icon={FiGlobe} title="Platform Role & Intermediary Disclaimer">
          <p>
            Athithya operates solely as an online intermediary platform that facilitates connections between travelers and independent hosts. Athithya does not own, operate, manage, supervise, or control any accommodations, experiences, tours, or services listed on the platform.
          </p>
          <p>
            Hosts are independent service providers and are solely responsible for the accuracy of their listings, the quality and safety of their services, compliance with applicable laws, permits, and licenses. Athithya is not a travel agency, tour operator, or service provider and does not assume responsibility for the conduct, acts, omissions, or services provided by hosts or users.
          </p>
        </Section>

        {/* 1. Acceptance */}
        <Section icon={FiFileText} title="1. Acceptance of Terms">
          <p>
            By registering, accessing, or using <strong>Athithya</strong>, you agree to comply with and be legally bound by these Terms. Users must be at least 18 years old to register and use the Athithya platform. By using the platform, users confirm that they meet this requirement. You do not agree to any part of these terms, you may not access or use the platform.
          </p>
        </Section>

        {/* 2. Services Offered */}
        <Section icon={FiLayout} title="2. Services Offered">
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <strong>Social Media:</strong> Share posts, travel stories, travel plans, reviews, images, and connect with fellow travellers and locals.
            </li>
            <li>
              <strong>Marketplace Hosting:</strong> Discover, list, and book accommodations, cuisines & experiences, or guided tour experiences offered by local hosts.
            </li>
          </ul>
        </Section>

        {/* 3. User Responsibilities */}
        <Section icon={FiUser} title="3. User Responsibilities">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For All Users:</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Provide accurate and truthful information.</li>
                <li>Refrain from posting harmful, offensive, or illegal content.</li>
                <li>Respect the privacy and rights of other users.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Hosts:</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Provide clear, accurate descriptions of services and pricing.</li>
                <li>Fulfill all bookings honestly and professionally.</li>
                <li>Comply with local laws and tax regulations.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Travelers:</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Respect the property, time, and rules of hosts.</li>
                <li>Provide accurate reviews and feedback.</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* 4. Content Policy */}
        <Section icon={FiFileText} title="4. Content Policy">
          <p>
            You retain ownership of your content but grant <strong>Athithya</strong> a non-exclusive, royalty-free, worldwide license to use, display, and promote it.
          </p>
          <p>
            We reserve the right to remove content that violates our policies or legal standards.
          </p>
        </Section>

        {/* 5. Payment and Fees */}
        <Section icon={FiCreditCard} title="5. Payment and Fees">
          <ul className="list-disc ml-5 space-y-1">
            <li>Payments for bookings are processed via secure third-party payment providers.</li>
            <li><strong>Athithya</strong> may charge a service fee on bookings, which will be disclosed during checkout.</li>
            <li>Hosts are responsible for local taxes and compliance.</li>
            <li>Athithya will initiate Payment/Refund as soon as possible however payment completion will take place depending on the bank's TAT.</li>
          </ul>
        </Section>

        {/* 6. Cancellation and Refunds */}
        <Section icon={FiAlertTriangle} title="6. Cancellation and Refunds">
          <p>
            We understand that plans may change, and we strive to offer a fair cancellation process. Please review the following guidelines:
          </p>
          <p>
            Refund eligibility is determined based on the time of cancellation relative to the scheduled check-in or experience start time:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Cancellations made within 1 hour of booking: 100% refund.</li>
            <li>Cancellations made more than 72 hours before check-in: 70% refund.</li>
            <li>Cancellations made within 72 hours of check-in: Non-refundable.</li>
          </ul>

          <div className="mt-6 overflow-x-auto">
            <h4 className="font-semibold mb-3">Refund Window Table</h4>
            <table className="min-w-full text-sm text-left border border-gray-200">
              <thead className="bg-gray-50 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-200">Time of Cancellation</th>
                  <th className="px-4 py-2 border-b border-gray-200">Refund Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2">Within 1 hour from booking</td>
                  <td className="px-4 py-2">100% Refund</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Within 72 hours to check-in</td>
                  <td className="px-4 py-2">Non-Refundable</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">After 72 hours to check-in</td>
                  <td className="px-4 py-2">70% Refund</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* 7. Community Guidelines */}
        <Section icon={FiUser} title="7. Community Guidelines">
          <ul className="list-disc ml-5 space-y-1">
            <li>Respect cultural differences and travel responsibly.</li>
            <li>Harassment, discrimination, or exploitation of any kind is strictly prohibited.</li>
            <li>Accounts may be suspended or terminated for violations.</li>
          </ul>
        </Section>

        {/* 8. Privacy Policy */}
        <Section icon={FiLock} title="8. Privacy Policy">
          <p>
            Your use of the platform is also governed by our Privacy Policy, which explains how we collect and use your personal data.
          </p>
        </Section>

        {/* 9. Limitation of Liability */}
        <Section icon={FiAlertTriangle} title="9. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, Athithya shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, reputation, or personal injury arising out of or related to the use of the platform or services booked through it. Athithya’s total liability, if any, shall not exceed the service fee paid to Athithya for the specific booking in question.
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
            <p className="font-semibold text-yellow-800 mb-2">
              Athithya will take utmost care but is not liable for:
            </p>
            <ul className="list-disc ml-5 text-yellow-800 space-y-1">
              <li>Personal injury, property damage, or legal issues arising from bookings.</li>
              <li>Misconduct by users or hosts.</li>
              <li>Downtime, data loss, or technical glitches.</li>
            </ul>
          </div>
          <p className="mt-4 italic text-gray-600 bg-gray-50 p-3 rounded">
            "Though hosts/users are not legally obliged to ask for identity proofs, they are encouraged to confirm them for valid security reasons. Travelers, on the other hand, are requested to carry valid identity proofs with them to ensure their identity can be verified if needed. This helps in maintaining safety of both hosts and users."
          </p>
        </Section>

        {/* 10. Assumption Of Risk */}
        <Section icon={FiAlertTriangle} title="10. Assumption Of Risk">
          <p>
            Travel and participation in experiences involve inherent risks, including but not limited to physical injury, illness, loss of property, accidents, delays, or unforeseen circumstances.
          </p>
          <p>
            By using the platform and participating in any experience or meeting other travelers, users acknowledge and voluntarily assume all associated risks. Athithya does not guarantee the safety, quality, or suitability of any host, traveler, or experience.
          </p>
        </Section>

        {/* 11. Modifications (Renumbered from 10 duplicate) */}
        <Section icon={FiFileText} title="11. Modifications to Terms">
          <p>
            We may modify these Terms at any time. Continued use of the platform after changes indicates your acceptance.
          </p>
        </Section>

        {/* 12. Identity Verification (Renumbered from 11) */}
        <Section icon={FiShield} title="12. Identity Verification and Trust Indicators">
          <p>
            Athithya may offer optional or mandatory identity verification features for users and hosts to enhance trust and safety on the platform. Verification may include mobile number validation, email verification, government-issued identification checks, or social account linking. Verification badges or labels indicate that certain checks have been completed; however, they do not guarantee a user’s conduct, intent, or safety. Athithya does not make any representations or warranties regarding verified users.
          </p>
          <p>
            Athithya does not conduct background checks on users unless explicitly stated. Users are solely responsible for their interactions with other users, including travel partners met through the platform.
          </p>
          <p>
            Athithya is not responsible for any disputes, misconduct, harassment, or incidents occurring during or outside the platform. Users are advised to exercise caution, meet in groups where possible, and follow safety guidelines provided by the platform.
          </p>
        </Section>

        {/* 13. Governing Law (Renumbered from 12) */}
        <Section icon={FiGlobe} title="13. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Uttarakhand, Dehradun, India.
          </p>
        </Section>

        {/* 14. Dispute Resolution (Renumbered from 13) */}
        <Section icon={FiShield} title="14. Dispute Resolution">
          <p>
            Users agree to first attempt to resolve disputes amicably by contacting Athithya’s grievance support. If unresolved, disputes shall be settled through arbitration in accordance with the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be Dehradun, India.
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

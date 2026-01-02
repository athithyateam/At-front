import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiUser,
  FiCreditCard,
  FiAlertTriangle,
  FiFileText,
  FiGlobe,
  FiLayout,
  FiLock,
  FiEye,
  FiDatabase,
  FiSettings,
  FiCheckCircle,
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
    <div className="text-gray-700 leading-relaxed text-sm space-y-4 text-left">
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
              Terms & Conditions
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Last Updated: 01-Jan-26
            </p>
          </div>
          <p className="text-gray-700 text-sm mt-6">
            Welcome to Athithya, a travel experience platform that seamlessly combines the warmth of local hosting with the interactivity of social media, offering everyone a complete, meaningful and immersive traveling experience. By accessing or using our website or application, you agree to be bound by these Terms and Conditions.
          </p>
        </motion.div>

        {/* --- PART 1: TERMS AND CONDITIONS --- */}
        <div className="mb-12">
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
              By registering, accessing, or using <strong>Athithya</strong>, you agree to comply with and be legally bound by these Terms. Users must be at least 18 years old to register and use the Athithya platform. By using the platform, users confirm that they meet this requirement. If you do not agree to any part of these terms, you may not access or use the platform.
            </p>
          </Section>

          {/* 2. Services Offered */}
          <Section icon={FiLayout} title="2. Services Offered">
            <ul className="list-disc pl-5 space-y-2">
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
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide accurate and truthful information.</li>
                  <li>Refrain from posting harmful, offensive, or illegal content.</li>
                  <li>Respect the privacy and rights of other users.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">For Hosts:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide clear, accurate descriptions of services and pricing.</li>
                  <li>Fulfill all bookings honestly and professionally.</li>
                  <li>Comply with local laws and tax regulations.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">For Travelers:</h3>
                <ul className="list-disc pl-5 space-y-1">
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
            <ul className="list-disc pl-5 space-y-1">
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
            <ul className="list-disc pl-5 space-y-1">
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
            <ul className="list-disc pl-5 space-y-1">
              <li>Respect cultural differences and travel responsibly.</li>
              <li>Harassment, discrimination, or exploitation of any kind is strictly prohibited.</li>
              <li>Accounts may be suspended or terminated for violations.</li>
            </ul>
          </Section>

          {/* 8. Privacy Policy */}
          <Section icon={FiLock} title="8. Privacy Policy">
            <p>
              Your use of the platform is also governed by our Privacy Policy, which is included below for your reference.
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
              <ul className="list-disc pl-5 text-yellow-800 space-y-1">
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

          {/* 11. Modifications */}
          <Section icon={FiFileText} title="11. Modifications to Terms">
            <p>
              We may modify these Terms at any time. Continued use of the platform after changes indicates your acceptance.
            </p>
          </Section>

          {/* 12. Identity Verification */}
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

          {/* 13. Governing Law */}
          <Section icon={FiGlobe} title="13. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Uttarakhand, Dehradun, India.
            </p>
          </Section>

          {/* 14. Dispute Resolution */}
          <Section icon={FiShield} title="14. Dispute Resolution">
            <p>
              Users agree to first attempt to resolve disputes amicably by contacting Athithya’s grievance support. If unresolved, disputes shall be settled through arbitration in accordance with the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be Dehradun, India.
            </p>
          </Section>
        </div>

        {/* --- PART 2: PRIVACY POLICY --- */}
        <hr className="my-12 border-gray-200" />
        <div id="privacy-policy" className="mb-12">
          <h2 className="text-2xl font-bold text-[#C9A24D] mb-8">Privacy Policy</h2>

          <Section icon={FiDatabase} title="1. Information We Collect">
            <h3 className="font-semibold text-gray-800 mb-2">A. Personal Information</h3>
            <p>We collect Information you provide directly, including:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Name, email address, phone number</li>
              <li>Profile photo and bio</li>
              <li>Payment details (via secure third-party processors)</li>
              <li>Travel preferences, posts, and reviews</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">B. Automatically Collected Information</h3>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>IP address, browser type, operating system</li>
              <li>Usage data (pages visited, time spent, etc.)</li>
              <li>Device identifiers and location data (with permission)</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">C. Third-Party Information</h3>
            <p>We may receive data from:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Payment processors</li>
              <li>Social logins</li>
            </ul>
          </Section>

          <Section icon={FiUser} title="2. How We Use Your Information">
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create and manage your account</li>
              <li>Facilitate bookings and community interactions</li>
              <li>Process payments securely</li>
              <li>Personalize your user experience</li>
              <li>Communicate important updates or promotions</li>
              <li>Improve and maintain our platform</li>
              <li>Prevent fraud and abuse</li>
            </ul>
          </Section>

          <Section icon={FiGlobe} title="3. Sharing Your Information">
            <p>We do not sell your personal data. However, we may share your information with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hosts or travelers for booking and communication</li>
              <li>Service providers (e.g., payment gateways, hosting providers)</li>
              <li>Legal authorities when required by law or in response to a valid request</li>
            </ul>
          </Section>

          {/* 4. Cookies (Brief) */}
          <Section icon={FiEye} title="4. Cookies and Tracking Technologies">
            <p>We use cookies and similar tools to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze site performance and trends (See our Cookie Policy below for more details.)</li>
            </ul>
          </Section>

          <Section icon={FiLock} title="5. Data Security">
            <p>
              We take reasonable measures to protect your data from unauthorized access, alteration, or loss. However, no online system is 100% secure.
            </p>
          </Section>

          <Section icon={FiUser} title="6. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access, update, or delete your personal data</li>
              <li>Withdraw consent to data processing</li>
              <li>Request a copy of your data</li>
            </ul>
          </Section>

          <Section icon={FiDatabase} title="7. Data Retention">
            <p>We retain personal data as long as necessary for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Legal compliance</li>
              <li>Providing services</li>
              <li>Resolving disputes</li>
            </ul>
          </Section>

          <Section icon={FiShield} title="8. Children's Privacy">
            <p>
              Users must be at least 18 years old to register and use the Athithya platform. By using the platform, users confirm that they meet this requirement.
            </p>
          </Section>

          <Section icon={FiGlobe} title="9. International Users">
            <p>
              Your data may be transferred to and stored in countries outside your jurisdiction. We comply with applicable laws regarding such transfers.
            </p>
          </Section>

          <Section icon={FiFileText} title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy. We'll notify users by email or platform notices if changes are significant.
            </p>
          </Section>
        </div>

        {/* --- PART 3: COOKIE POLICY --- */}
        <hr className="my-12 border-gray-200" />
        <div id="cookie-policy" className="mb-12">
          <h2 className="text-2xl font-bold text-[#C9A24D] mb-8">Cookie Policy</h2>

          <Section icon={FiEye} title="1. What Are Cookies?">
            <p>
              Cookies are small text files placed on your device (computer, smartphone, tablet) when you visit a website. They help us recognize you, remember your preferences, and enhance your user experience.
            </p>
          </Section>

          <Section icon={FiSettings} title="2. Types of Cookies We Use">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">A. Essential Cookies</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Required for the platform to function properly (e.g., logging in, booking process).</li>
              </ul>

              <h3 className="font-semibold text-gray-800 mb-2">B. Performance Cookies</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Collect anonymous data to understand how users interact with our site (e.g., Google Analytics).</li>
              </ul>

              <h3 className="font-semibold text-gray-800 mb-2">C. Functional Cookies</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Remember choices you make (e.g., language, region, user preferences).</li>
              </ul>

              <h3 className="font-semibold text-gray-800 mb-2">D. Targeting/Advertising Cookies</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>May be set by third parties to build a profile of your interests and show relevant ads on other sites.</li>
              </ul>
            </div>
          </Section>

          <Section icon={FiGlobe} title="3. Third-Party Cookies">
            <p>Some cookies are placed by third-party services:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Google Analytics</li>
              <li>Facebook Pixel</li>
              <li>Stripe (payment processing)</li>
            </ul>
            <p>These services have their own privacy policies which govern how they use your data.</p>
          </Section>

          <Section icon={FiSettings} title="4. How You Can Control Cookies">
            <p>You can manage or disable cookies via your browser settings:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Block or delete cookies</li>
              <li>Opt-out of specific third-party tracking</li>
              <li>Note: Disabling cookies may limit functionality and degrade your user experience.</li>
            </ul>
          </Section>

          <Section icon={FiFileText} title="5. Updates to This Policy">
            <p>
              We may update this Cookie Policy as needed to reflect changes in technology or regulation. Significant changes will be communicated on our platform.
            </p>
          </Section>
        </div>

        {/* --- PART 4: HOST AGREEMENT --- */}
        <hr className="my-12 border-gray-200" />
        <div id="host-agreement" className="mb-12">
          <h2 className="text-2xl font-bold text-[#C9A24D] mb-8">Host Agreement</h2>

          <Section icon={FiCheckCircle} title="1. Eligibility">
            <p>To become a Host, you must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Be at least 18 years old</li>
              <li>Provide accurate identity and payment details</li>
              <li>Comply with all local laws and tax regulations</li>
            </ul>
          </Section>

          <Section icon={FiCheckCircle} title="2. Host Obligations">
            <p>You agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>List truthful, complete, and up-to-date information</li>
              <li>Clearly outline your services, prices, availability, rules, and cancellation terms</li>
              <li>Honor all confirmed bookings</li>
              <li>Maintain clean, safe, and respectful hosting environments</li>
              <li>Treat guests with kindness, fairness, and professionalism</li>
            </ul>
          </Section>

          <Section icon={FiLayout} title="3. Content and Media">
            <ul className="list-disc pl-5 space-y-1">
              <li>Hosts may upload photos, descriptions, and media to promote their listings.</li>
              <li>You retain ownership of your content but grant Athithya a worldwide, royalty-free license to use and promote it.</li>
            </ul>
          </Section>

          <Section icon={FiCreditCard} title="4. Payments and Fees">
            <ul className="list-disc pl-5 space-y-1">
              <li>Payments are processed via secure third-party providers. Athithya charges a platform fee on successful bookings. Hosts are responsible for any applicable taxes and must comply with local reporting obligations.</li>
            </ul>
          </Section>

          <Section icon={FiAlertTriangle} title="5. Cancellations and Refunds">

            <h4 className="font-semibold text-gray-800 mt-2 mb-2">Host Cancellation Policy</h4>

            <h5 className="font-medium text-gray-700 mt-2">1. Traveler’s Rights when Host Cancels</h5>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>The traveller will instantly receive a notification regarding the cancellation.</li>
              <li>The traveller will have the option to: Accept an alternative booking at the same price, OR Receive a full refund.</li>
            </ul>

            <h5 className="font-medium text-gray-700 mt-2">2. Host Cancellation Rules & Penalties</h5>
            <p className="mt-1"><strong>Valid reasons (no penalty):</strong></p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Natural disasters</li>
              <li>Personal safety emergencies</li>
              <li>Government restrictions</li>
              <li>Any reason Athithya’s team deems valid</li>
            </ul>

            <p><strong>Invalid reasons (penalties apply):</strong></p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Cancellation before 72 hours of check-in → Possible account block (based on reason).</li>
              <li>Cancellation within 72 hours of check-in → Progressive penalties.</li>
            </ul>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm text-left border border-gray-200">
                <thead className="bg-gray-50 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">Number of Cancellations</th>
                    <th className="px-4 py-2 border-b border-gray-200">Penalty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">1st Warning</td>
                    <td className="px-4 py-2">Negative de-rating</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">2nd Warning</td>
                    <td className="px-4 py-2">3 months account suspension</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">3rd Warning</td>
                    <td className="px-4 py-2">9 months account suspension</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">4th Time</td>
                    <td className="px-4 py-2">Permanent account block</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 className="font-medium text-gray-700 mt-4">3. Host Payment & Security Deposit Policy</h5>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hosts will not receive payments directly into their bank accounts.</li>
              <li>All payments will be credited into the Athithya’s Wallet.</li>
              <li>95% amount from the last booking can be withdrawn.</li>
              <li>5% is retained as a security deposit.</li>
              <li>If a host cancels a booking for the first time (without fulfilling any booking prior), the 5% security deposit will go negative (deducted additionally from future earnings). This ensures accountability and discourages cancellations without genuine reasons.</li>
            </ul>
          </Section>

          <Section icon={FiShield} title="6. Liability and Insurance">
            <ul className="list-disc pl-5 space-y-1">
              <li>Hosts are solely responsible for their own properties and experiences.</li>
              <li>Athithya is not liable for any personal injury, damage, or loss arising from host services.</li>
              <li>We recommend you obtain appropriate insurance coverage.</li>
            </ul>
          </Section>

          <Section icon={FiUser} title="7. Code of Conduct">
            <p>You must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Respect all travelers regardless of nationality, gender, religion, or background</li>
              <li>Avoid any form of discrimination, harassment, or exploitation</li>
              <li>Provide clear house rules and enforce them respectfully</li>
            </ul>
          </Section>

          <Section icon={FiAlertTriangle} title="8. Suspension and Termination">
            <p>Athithya reserves the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Suspend or remove listings that violate our policies</li>
              <li>Terminate host accounts for misconduct or breach of agreement</li>
            </ul>
          </Section>

          <Section icon={FiFileText} title="9. Modifications">
            <p>
              We may update this Agreement at any time. Continued use of the platform implies your acceptance of any changes.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

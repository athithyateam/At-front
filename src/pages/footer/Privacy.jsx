import React from "react";
import { motion } from "framer-motion";
import {
    FiShield,
    FiUser,
    FiLock,
    FiGlobe,
    FiFileText,
    FiEye,
    FiDatabase,
    FiSettings,
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

export default function Privacy() {
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
                            Privacy Policy & Cookie Policy
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                            Last Updated: 01-Jan-26
                        </p>
                    </div>
                    <p className="text-gray-700 text-sm mt-6">
                        Your privacy is important to us. This policy explains how information is collected, used, and disclosed by Athithya.
                    </p>
                </motion.div>

                {/* 1. Information We Collect */}
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

                {/* 2. How We Use Your Information */}
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

                {/* 3. Sharing Your Information */}
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

                {/* 5. Data Security */}
                <Section icon={FiLock} title="5. Data Security">
                    <p>
                        We take reasonable measures to protect your data from unauthorized access, alteration, or loss. However, no online system is 100% secure.
                    </p>
                </Section>

                {/* 6. Your Rights */}
                <Section icon={FiUser} title="6. Your Rights">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Access, update, or delete your personal data</li>
                        <li>Withdraw consent to data processing</li>
                        <li>Request a copy of your data</li>
                    </ul>
                </Section>

                {/* 7. Data Retention */}
                <Section icon={FiDatabase} title="7. Data Retention">
                    <p>We retain personal data as long as necessary for:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Legal compliance</li>
                        <li>Providing services</li>
                        <li>Resolving disputes</li>
                    </ul>
                </Section>

                {/* 8. Children's Privacy */}
                <Section icon={FiShield} title="8. Children's Privacy">
                    <p>
                        Users must be at least 18 years old to register and use the Athithya platform. By using the platform, users confirm that they meet this requirement.
                    </p>
                </Section>

                {/* 9. International Users */}
                <Section icon={FiGlobe} title="9. International Users">
                    <p>
                        Your data may be transferred to and stored in countries outside your jurisdiction. We comply with applicable laws regarding such transfers.
                    </p>
                </Section>

                {/* 10. Changes to This Policy */}
                <Section icon={FiFileText} title="10. Changes to This Policy">
                    <p>
                        We may update this Privacy Policy. We'll notify users by email or platform notices if changes are significant.
                    </p>
                </Section>

                {/* DIVIDER */}
                <hr className="my-12 border-gray-200" />

                {/* COOKIE POLICY SECTION */}
                <div id="cookie-policy" className="text-left">
                    <h2 className="text-2xl font-bold text-[#C9A24D] mb-8 text-left">Cookie Policy</h2>

                    {/* 1. What Are Cookies? */}
                    <Section icon={FiEye} title="1. What Are Cookies?">
                        <p>
                            Cookies are small text files placed on your device (computer, smartphone, tablet) when you visit a website. They help us recognize you, remember your preferences, and enhance your user experience.
                        </p>
                    </Section>

                    {/* 2. Types of Cookies We Use */}
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

                    {/* 3. Third-Party Cookies */}
                    <Section icon={FiGlobe} title="3. Third-Party Cookies">
                        <p>Some cookies are placed by third-party services:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-4">
                            <li>Google Analytics</li>
                            <li>Facebook Pixel</li>
                            <li>Stripe (payment processing)</li>
                        </ul>
                        <p>These services have their own privacy policies which govern how they use your data.</p>
                    </Section>

                    {/* 4. How You Can Control Cookies */}
                    <Section icon={FiSettings} title="4. How You Can Control Cookies">
                        <p>You can manage or disable cookies via your browser settings:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Block or delete cookies</li>
                            <li>Opt-out of specific third-party tracking</li>
                            <li>Note: Disabling cookies may limit functionality and degrade your user experience.</li>
                        </ul>
                    </Section>

                    {/* 5. Updates to This Policy */}
                    <Section icon={FiFileText} title="5. Updates to This Policy">
                        <p>
                            We may update this Cookie Policy as needed to reflect changes in technology or regulation. Significant changes will be communicated on our platform.
                        </p>
                    </Section>
                </div>

            </div>
        </div>
    );
}

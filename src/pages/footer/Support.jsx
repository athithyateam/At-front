import Carousel from "../../components/Carousel";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const GOLD = {
  border: "border-[#d4af37]", // Deep gold border
  accent: "text-[#b8860b]", // Text gold tone
  softBorder: "border-[#f1d18a]", // Soft gold border
};

const USER_CONTACT = {
  label: "For Users",
  name: "Surya",
  whatsapp: "+91 9389860637",
  email: "teamsathithya@gmail.com",
  phone: "+91 93898 60637",
};

const SUPPORT_HOURS = "10:00 AM – 5:00 PM IST";
const makeWaLink = (num, prefill = "") => {
  const cleaned = num.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleaned}${
    prefill ? `?text=${encodeURIComponent(prefill)}` : ""
  }`;
};

function ContactCard({ label, person }) {
  return (
    <article
      className={`rounded-2xl bg-white p-6 shadow-md border ${GOLD.softBorder} hover:shadow-lg transition`}
      aria-labelledby={`${label.replace(/\s/g, "")}-heading`}
    >
      <div className="flex items-center justify-between mb-4">
        <h4
          id={`${label.replace(/\s/g, "")}-heading`}
          className={`text-sm font-semibold uppercase tracking-wide ${GOLD.accent}`}
        >
          {label}
        </h4>
        <span
          className={`text-[11px] px-2 py-1 rounded-full bg-[#fff7e0] ${GOLD.accent} border ${GOLD.softBorder}`}
        >
          Priority Support
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-1">
        <span className="font-medium">{person.name}</span>
      </p>
      <p className="text-xs text-gray-500 mb-5">
        Typically responds within business hours
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={makeWaLink(
            person.whatsapp,
            `Hi ${person.name}, I need help (${label}).`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                     bg-green-50 hover:bg-green-100 border border-green-200 focus:outline-none
                     focus:ring-offset-2 focus:ring-0"
          aria-label={`Open WhatsApp chat with ${person.name}`}
        >
          <FaWhatsapp className="h-4 w-4" />
          WhatsApp
        </a>

        <a
          href={`mailto:${person.email}?subject=${encodeURIComponent(
            "Help Request from Athithya User"
          )}&body=${encodeURIComponent("Hi Surya,\n\nI need help with...")}`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                     bg-white hover:bg-gray-50 border border-gray-200 focus:outline-none
                     focus:ring-offset-2 focus:ring-0"
          aria-label={`Send email to ${person.name}`}
        >
          <FiMail className="h-4 w-4" />
          Email
        </a>

        <a
          href={`tel:${person.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                     bg-white hover:bg-gray-50 border border-gray-200 focus:outline-none
                     focus:ring-offset-2 focus:ring-0"
          aria-label={`Call ${person.name}`}
        >
          <FiPhone className="h-4 w-4" />
          Call
        </a>
      </div>
    </article>
  );
}

export default function HelpSupportPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#fafafac7] to-white text-gray-800">
      {/* Top carousel */}
      <section className="w-full relative">
        <div className="w-full mx-auto">
          <Carousel />
          {/* soft gold overlay */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#fff6dc]/50" />
        </div>
      </section>

      {/* Page content */}
      <section className="mx-auto px-4 md:px-6 lg:px-12 py-12">
        {/* Heading */}
        <div className="flex justify-center mb-10">
          <div
            className={`px-6 py-2 rounded-full bg-white text-sm font-semibold tracking-wider uppercase shadow-md border ${GOLD.border} ${GOLD.accent}`}
          >
            Help &amp; Support
          </div>
        </div>

        {/* Single contact card (For Users only) */}
        <div className="mx-auto mb-10">
          <ContactCard label="For Users" person={USER_CONTACT} />
        </div>

        <div
          className={`rounded-2xl bg-white p-6 text-sm text-gray-700 shadow-md border ${GOLD.softBorder} mx-auto`}
        >
          <div className="flex items-start gap-3">
            <div
              className="h-2.5 w-2.5 rounded-full bg-emerald-500 relative top-1"
              aria-hidden
            />
            <div>
              <p className="mb-2">
                <strong className={GOLD.accent}>Availability:</strong> We’re
                available on WhatsApp from{" "}
                <span className="font-medium">{SUPPORT_HOURS}</span>. Messages
                outside these hours will be responded to the next business day.
              </p>
              <p className="text-xs text-gray-500">
                Tip: For quicker resolution, include your booking ID, registered
                phone/email, and a brief description of the issue.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

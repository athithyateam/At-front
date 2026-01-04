import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const GOLD = {
  border: "border-[#d4af37]", // Deep gold border
  accent: "text-[#b8860b]", // Text gold tone
  softBorder: "border-[#f1d18a]", // Soft gold border
  bgSoft: "bg-[#fff9e6]", // Soft gold background
};

const USER_CONTACT = {
  label: "",
  name: "Surya",
  whatsapp: "+91 9389860637",
  email: "teamsathithya@gmail.com",
  phone: "+91 93898 60637",
};

const SUPPORT_HOURS = "10:00 AM – 5:00 PM IST";
const makeWaLink = (num, prefill = "") => {
  const cleaned = num.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleaned}${prefill ? `?text=${encodeURIComponent(prefill)}` : ""
    }`;
};

function ContactCard({ label, person }) {
  return (
    <article
      className={`rounded-2xl bg-white p-8 shadow-lg border ${GOLD.softBorder} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}
      aria-labelledby={`${label && label.replace(/\s/g, "")}-heading`}
    >
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff6dc] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          {label && <h4
            id={`${label.replace(/\s/g, "")}-heading`}
            className={`text-sm font-semibold uppercase tracking-wide ${GOLD.accent}`}
          >
            {label}
          </h4>}
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full ${GOLD.bgSoft} ${GOLD.accent} border ${GOLD.softBorder} tracking-wide uppercase`}
          >
            Priority Support
          </span>
        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Contact Person</p>
          <p className="text-2xl font-bold text-gray-800">
            {person.name}
          </p>
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Typically responds within business hours
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={makeWaLink(
              person.whatsapp,
              `Hi ${person.name}, I need help (${label}).`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold
                        bg-[#25D366] text-white hover:bg-[#128c7e] shadow-md hover:shadow-lg transition-all duration-300"
            aria-label={`Open WhatsApp chat with ${person.name}`}
          >
            <FaWhatsapp className="h-5 w-5" />
            WhatsApp
          </a>

          <a
            href={`mailto:${person.email}?subject=${encodeURIComponent(
              "Help Request from Athithya User"
            )}&body=${encodeURIComponent("Hi Surya,\n\nI need help with...")}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold
                        bg-white text-gray-700 hover:text-[#b8860b] hover:bg-gray-50 border border-gray-200 hover:border-[#d4af37] shadow-sm hover:shadow-md transition-all duration-300"
            aria-label={`Send email to ${person.name}`}
          >
            <FiMail className="h-5 w-5" />
            Email
          </a>

          <a
            href={`tel:${person.phone.replace(/\s/g, "")}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold
                        bg-white text-gray-700 hover:text-[#b8860b] hover:bg-gray-50 border border-gray-200 hover:border-[#d4af37] shadow-sm hover:shadow-md transition-all duration-300"
            aria-label={`Call ${person.name}`}
          >
            <FiPhone className="h-5 w-5" />
            Call
          </a>
        </div>
      </div>
    </article>
  );
}

export default function HelpSupportPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#fffaf3] to-white text-gray-800">

      {/* HEADER SPLASH */}
      <section className="pt-24 pb-12 text-center relative overflow-hidden px-4">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#fff6dc] rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="inline-block px-6 py-2 mb-6 rounded-full bg-white text-sm font-semibold tracking-wider uppercase shadow-md border border-[#d4af37] text-[#b8860b]">
          Help & Support
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#b8860b] mb-6 tracking-tight">How can we help you?</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
          Our team is here to assist you with any questions or issues you may have.
          Reach out to us directly for priority support.
        </p>
      </section>

      {/* Page content */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 pb-24 space-y-12">

        {/* Single contact card (For Users only) */}
        <div className="mx-auto transform transition-all duration-500 hover:scale-[1.01]">
          <ContactCard label="" person={USER_CONTACT} />
        </div>

        {/* Availability Info Block */}
        <div
          className={`rounded-2xl bg-white/80 backdrop-blur-sm p-8 text-sm text-gray-700 shadow-md border ${GOLD.softBorder} mx-auto relative overflow-hidden`}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37]"></div>
          <div className="flex items-start gap-4">
            <div
              className="h-3 w-3 rounded-full bg-emerald-500 relative top-1.5 shrink-0 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              aria-hidden
            />
            <div>
              <p className="mb-3 text-base leading-relaxed">
                <strong className={`${GOLD.accent} text-lg block mb-1`}>Availability</strong>
                We’re available on WhatsApp from{" "}
                <span className="font-bold text-gray-900 bg-[#fff9e6] px-2 py-0.5 rounded border border-[#f1d18a]">{SUPPORT_HOURS}</span>. <br />
                Messages outside these hours will be responded to the next business day.
              </p>
              <p className="text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block">
                <span className="font-semibold text-[#b8860b] not-italic mr-1">Tip:</span>
                For quicker resolution, include your booking ID, registered
                phone/email, and a brief description of the issue.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

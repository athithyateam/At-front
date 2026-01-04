import React, { useEffect, useRef, useState } from "react";
import Carousel from "../../components/Carousel";
import { FiMail, FiPhone, FiX } from "react-icons/fi";

const fallbackImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZPQJ7kRFouOgvueVTlEG5unB1s979ktYYg&s";

// keep photos comment (as requested)
// import puneetImg from "../assets/team-puneet.png"; 
// import muskanImg from "../assets/team-muskan.png";
// import priyanshuImg from "../assets/team-priyanshu.png";
// import vanshImg from "../assets/team-vansh.png";
// import shreyaImg from "../assets/team-shreya.png";
// import yuvrajImg from "../assets/team-yuvraj.png";

const team = [
  {
    name: "Puneet",
    role: "Tech Lead",
    img: "/members/puneet-photo.jpg",
    bio:
      "Leads our engineering stack with a focus on performance, accessibility, and clean DX.",
  },
  {
    name: "Muskan",
    role: "Design Lead",
    img: "/members/muskan-photo.jpg",
    bio:
      "Crafts human-centered interfaces and visual systems that scale across devices.",
  },
  {
    name: "Suraj",
    role: "Frontend Developer",
    img: fallbackImg,
    bio:
      "Builds responsive, user-friendly interfaces with a focus on seamless experiences.",
  },
  {
    name: "Anivesh",
    role: "Marketing & Management",
    img: fallbackImg,
    bio:
      "Builds campaigns that connect the right audiences with the right experiences.",
  },
  {
    name: "Yuvraj",
    role: "Finance / Legal",
    img: "/members/yuvraj-photo.jpg",
    bio:
      "Keeps our operations sharp and compliant while enabling smart growth.",
  },
];

// Accessible Modal (focus trap + ESC + backdrop click)
function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement;
      dialogRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      lastFocused.current && lastFocused.current.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll(
          'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const headingId = "modal-heading-id";

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby={headingId}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 w-[min(92vw,760px)] rounded-2xl bg-white p-6 shadow-2xl outline-none border border-[#f1d18a]"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          aria-label="Close"
        >
          <FiX className="h-5 w-5 text-[#b8860b]" />
        </button>
        <h2 id={headingId} className="sr-only">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

export default function SpecialMentionsPage() {
  const [active, setActive] = useState(null); // person object or null

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#fffaf3] to-white text-gray-800">

      {/* HEADER SECTION */}
      <section className="pt-20 pb-10 text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#fff6dc] rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="inline-block px-6 py-2 mb-6 rounded-full bg-white text-sm font-semibold tracking-wider uppercase shadow-md border border-[#d4af37] text-[#b8860b]">
          Atithya Community
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#b8860b] mb-4 tracking-tight">Special Mentions</h1>
        <p className="max-w-2xl mx-auto text-gray-600 px-4">
          Celebrating the people and moments that make our journey extraordinary.
        </p>
      </section>

      {/* CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-12 pb-24 space-y-16">

        {/* SECTION 1: HEARTFELT THANKS */}
        {/* Split layout: Image Left, Text Right (on desktop) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-1 md:order-1 flex justify-center md:justify-start">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#f1d18a] to-[#d4af37] rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
              <div className="relative border border-[#f1d18a] rounded-xl p-3 bg-white shadow-xl rotate-[-2deg] hover:rotate-0 transition duration-300">
                <img
                  src="/images/special-mention-1.jpeg"
                  alt="Special moment"
                  className="w-full max-w-sm md:max-w-md h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="order-2 md:order-2 md:pl-8">
            <div className="bg-white/50 backdrop-blur-sm border-l-4 border-[#d4af37] p-6 rounded-r-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-[#8a6d1f]">To Our Community</h2>
              <p className="text-lg leading-relaxed text-gray-700 italic">
                "We extend heartfelt thanks to all our Users and Hosts for placing your trust in us.
                Your confidence fuels our passion, and we are committed to safeguarding this trust
                for years to come."
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: SPECIAL NOTE OF THANKS (TEAM) */}
        {/* Split layout: Content Left (wider), Image Right */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="border border-[#f2e3b6] rounded-2xl p-8 bg-white shadow-lg relative overflow-hidden">
              {/* Watermark/Texture */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff6dc] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

              <h3 className="font-semibold mb-3 text-[#b8860b] text-2xl relative z-10">
                A special note of thanks
              </h3>
              <p className="text-base leading-relaxed mb-8 text-gray-700 max-w-3xl relative z-10">
                To our incredible teammates for their dedication and passion in ensuring Athithya
                stays true to its values, standards, and exceptional service. Your work helps us
                continually evolve.
              </p>

              {/* Team list */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
                {team.map((m) => (
                  <li key={m.name}>
                    <button
                      onClick={() => setActive(m)}
                      className="group w-full text-left rounded-xl border border-[#f2e3b6] bg-white hover:bg-[#fffaf0] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 p-3">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-[#f1d18a] flex-shrink-0">
                            <img
                              src={m.img || fallbackImg}
                              alt={`${m.name} avatar`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-gray-900 truncate">
                            {m.name}
                          </div>
                          <div className="text-xs text-[#b8860b] truncate uppercase tracking-wider">
                            {m.role}
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[#f2e3b6] text-center sm:text-left">
                <p className="text-sm font-medium text-gray-500">
                  Together, as a team, let’s keep the great work going.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center justify-center h-full">
            <div className="sticky top-8 w-full max-w-sm">
              <div className="border border-[#f1d18a] rounded-xl p-4 bg-white shadow-lg rotate-2 hover:rotate-0 transition duration-500">
                <img
                  src="/images/special-mention-2.jpeg"
                  alt="Team moment"
                  className="w-full h-auto object-cover rounded-lg aspect-[3/4]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: JOIN OUR TEAM */}
        {/* Full width centered banner */}
        <section className="flex justify-center">
          <div className="w-full max-w-4xl bg-linear-to-r from-[#fffaf3] to-white border border-[#f2e3b6] rounded-2xl p-8 md:p-12 shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Journey</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
              We’re always looking for passionate individuals to join our team. If you share our
              love for making travel and experiences easier and more enjoyable, we’d love to hear
              from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <FiPhone className="text-[#b8860b]" />
                <span>+91-9389860637</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <FiMail className="text-[#b8860b]" />
                <a href="mailto:teamsathithya@gmail.com" className="hover:text-[#b8860b] transition">
                  teamsathithya@gmail.com
                </a>
              </div>
            </div>

            <div>
              <a
                href="mailto:teamsathithya@gmail.com"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-white font-semibold shadow-lg shadow-[#d4af37]/20 transition transform hover:-translate-y-1 hover:shadow-xl
                                bg-gradient-to-r from-[#b8860b] to-[#d4af37]
                                hover:from-[#a67c00] hover:to-[#caa233]"
              >
                <span>Send us an Email</span>
                <FiMail />
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Profile Modal */}
      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active ? `${active.name} – ${active.role}` : "Profile"}
      >
        {active && (
          <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-6">
            <div className="w-full">
              <div className="relative rounded-xl overflow-hidden shadow-md ring-4 ring-[#f1d18a]/30">
                <img
                  src={active.img || fallbackImg}
                  alt={`${active.name} portrait`}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-2xl font-bold text-[#b8860b] mb-1">
                {active.name}
              </h4>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4 border-b border-[#f2e3b6] pb-2 inline-block">
                {active.role}
              </div>
              <p className="text-base leading-relaxed text-gray-700">{active.bio}</p>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}

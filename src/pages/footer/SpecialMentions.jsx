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
    name: "Priyanshu",
    role: "Video Editor",
    img: fallbackImg,
    bio:
      "Turns raw footage into compelling stories that amplify creators' voices.",
  },
  {
    name: "Vansh",
    role: "Marketing",
    img: "/members/vansh-photo.jpg",
    bio:
      "Builds campaigns that connect the right audiences with the right experiences.",
  },
  {
    name: "Shreya",
    role: "Marketing",
    img: fallbackImg,
    bio:
      "Leads partnerships and social poststelling with data-informed strategy.",
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
      {/* HERO / CAROUSEL */}
      <section className="w-full relative">
        <div className="w-full mx-auto">
          <Carousel />
          {/* soft gold vignette */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#fff6dc]/50" />
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto px-4 md:px-6 lg:px-12 py-12">
        {/* Section tag */}
        <div className="flex justify-center mb-10">
          <div className="px-6 py-2 rounded-full bg-white text-sm font-semibold tracking-wider uppercase shadow-md border border-[#d4af37] text-[#b8860b]">
            Special Mentions
          </div>
        </div>

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="border border-[#f1d18a] rounded-xl p-4 bg-white shadow-lg w-full max-w-xs hover:shadow-2xl transition">
              <img
                src={fallbackImg}
                alt="Special moment"
                className="w-full h-44 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="border border-[#f2e3b6] rounded-xl p-6 bg-white shadow-md">
              <p className="text-sm leading-relaxed text-gray-700">
                We extend heartfelt thanks to all our Users and Hosts for placing your trust in us.
                Your confidence fuels our passion, and we are committed to safeguarding this trust
                for years to come.
              </p>
            </div>
          </div>
        </div>

        {/* Middle row */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="border border-[#f2e3b6] rounded-2xl p-6 bg-white shadow-md">
              <h3 className="font-semibold mb-3 text-[#b8860b] text-lg">
                A special note of thanks
              </h3>
              <p className="text-sm leading-relaxed mb-5 text-gray-700">
                To our incredible teammates for their dedication and passion in ensuring Athithya
                stays true to its values, standards, and exceptional service. Your work helps us
                continually evolve.
              </p>

              {/* Team list as elegant chips/cards */}
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map((m) => (
                  <li key={m.name}>
                    <button
                      onClick={() => setActive(m)}
                      className="group cursor-pointer w-full text-left rounded-xl border border-[#f2e3b6] bg-white/80 hover:bg-[#fffaf0] transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    >
                      <div className="flex items-center gap-3 p-3 ">
                        <div className="h-10 w-10 rounded-full overflow-hidden ring-1 ring-[#f1d18a] flex-shrink-0">
                          <img
                            src={m.img || fallbackImg}
                            alt={`${m.name} avatar`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {m.name}
                          </div>
                          <div className="text-xs text-gray-600 truncate">
                            {m.role}
                          </div>
                        </div>
                        <span className="ml-auto text-[10px] tracking-widest uppercase text-[#b8860b] hidden sm:block">
                          View
                        </span>
                      </div>
                      <div className="border-t border-[#f8ecc7]" />
                      <div className="px-3 py-2 text-[12px] text-gray-600 line-clamp-2">
                        {m.bio}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>

              <p className="text-sm mt-5 text-gray-600">
                Together, as a team, let’s keep the great work going.
              </p>
            </div>
          </div>

          {/* Right column: stacked photo cards */}
          <div className="lg:col-span-1 grid grid-rows-2 gap-6">
            <div className="border border-[#f1d18a] rounded-xl p-4 bg-white shadow-lg flex items-center justify-center">
              <img
                src={fallbackImg}
                alt="Team moment"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            <div className="border border-[#f1d18a] rounded-xl p-4 bg-white shadow-lg flex items-center justify-center">
              <img
                src={fallbackImg}
                alt="Celebration"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex justify-start">
            <div className="border border-[#f2e3b6] rounded-xl p-4 bg-white shadow-md w-full max-w-sm">
              <img
                src={fallbackImg}
                alt="Community"
                className="w-full h-44 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="h-full border border-[#f2e3b6] bg-white p-6 rounded-2xl shadow-md">
              <p className="text-sm leading-relaxed mb-5 text-gray-700">
                We’re always looking for passionate individuals to join our team. If you share our
                love for making travel and experiences easier and more enjoyable, we’d love to hear
                from you.
              </p>
              <div className="mt-4 text-sm space-y-3">
                <p className="flex items-center gap-2 text-gray-700">
                  <FiPhone className="text-[#b8860b]" /> <span>+91-9389860637</span>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <FiMail className="text-[#b8860b]" />
                  <a
                    className="hover:underline"
                    href="mailto:teamsathithya@gmail.com"
                  >
                    teamsathithya@gmail.com
                  </a>
                </p>
              </div>

              <div className="mt-6">
                <a
                  href="mailto:teamsathithya@gmail.com"
                  className="inline-block rounded-md px-5 py-2 text-white font-medium shadow transition
                             bg-gradient-to-r from-[#b8860b] to-[#d4af37]
                             hover:from-[#a67c00] hover:to-[#caa233] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37]"
                >
                  Join Our Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active ? `${active.name} – ${active.role}` : "Profile"}
      >
        {active && (
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-5">
            <div className="w-full">
              <img
                src={active.img || fallbackImg}
                alt={`${active.name} portrait`}
                className="w-36 h-36 object-cover rounded-lg mx-auto sm:mx-0 ring-2 ring-[#f1d18a]"
              />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-[#b8860b]">
                {active.name}
              </h4>
              <div className="text-sm text-gray-600 mb-3">{active.role}</div>
              <p className="text-sm leading-relaxed text-gray-700">{active.bio}</p>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}

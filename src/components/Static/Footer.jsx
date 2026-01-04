import { FaInstagram, FaLinkedinIn, FaYoutube, FaRegCopyright } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#f9fafb] border-t border-[#e5e7eb] text-gray-600 font-sans">
      {/* Subtle top decoration */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 py-12">
        {/* --- Top Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

          {/* --- Column 1: Logo + Address + About --- */}
          <div className="flex flex-col items-start gap-5">
            <Link to="/" className="block">
              <img
                src="/athithya-logo.png"
                alt="Athithya logo"
                className="w-36 transition-opacity hover:opacity-80"
              />
            </Link>

            <address className="not-italic text-sm leading-relaxed text-gray-500 font-normal border-l-2 border-[#d4af37] pl-3 text-left">
              <span className="font-bold text-[#b8860b] uppercase tracking-wide text-xs mb-1 block">Registered Address</span>
              Athithya Brands<br />
              Clement Town<br />
              Dehradun, Uttarakhand — 248001
            </address>

            <Link
              to="/about"
              className="text-sm font-semibold text-[#b8860b] hover:text-[#9a7009] transition-colors mt-2 border-b border-[#b8860b]/30 pb-0.5 hover:border-[#b8860b]"
            >
              Read Our Story &rarr;
            </Link>
          </div>

          {/* --- Column 2: Quick Links (Centered on desktop) --- */}
          <div className="flex flex-col md:items-center items-start gap-6">
            <h4 className="font-bold text-gray-800 tracking-wider uppercase text-sm border-b-2 border-[#f3e3b3] pb-2 px-1">
              Explore
            </h4>
            <nav className="flex flex-col gap-3 md:items-center items-start text-sm font-medium">
              <Link to="/host" className="hover:text-[#b8860b] transition-all hover:translate-x-1 md:hover:translate-x-0 md:hover:scale-105">
                For Host
              </Link>
              <Link to="/creators" className="hover:text-[#b8860b] transition-all hover:translate-x-1 md:hover:translate-x-0 md:hover:scale-105">
                For Creators
              </Link>
              <Link to="/support" className="hover:text-[#b8860b] transition-all hover:translate-x-1 md:hover:translate-x-0 md:hover:scale-105">
                Support
              </Link>
              <Link to="/safety" className="hover:text-[#b8860b] transition-all hover:translate-x-1 md:hover:translate-x-0 md:hover:scale-105">
                Safety
              </Link>
            </nav>
          </div>

          {/* --- Column 3: Legal + Social (Right aligned on desktop) --- */}
          <div className="flex flex-col md:items-end items-start gap-6">
            <h4 className="font-bold text-gray-800 tracking-wider uppercase text-sm border-b-2 border-[#f3e3b3] pb-2 px-1">
              Important Information
            </h4>
            <nav className="flex flex-col gap-3 md:items-end items-start text-sm font-medium">
              <Link to="/terms" className="hover:text-[#b8860b] transition-all md:hover:-translate-x-1 hover:translate-x-1">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="hover:text-[#b8860b] transition-all md:hover:-translate-x-1 hover:translate-x-1">
                Privacy Policy
              </Link>
              <Link to="/mentions" className="hover:text-[#b8860b] transition-all md:hover:-translate-x-1 hover:translate-x-1">
                Special Mentions
              </Link>
            </nav>

            {/* --- Social Icons --- */}
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.instagram.com/athithya.in"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-400 hover:text-[#E1306C] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/athithya"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-400 hover:text-[#0077b5] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-400 hover:text-[#FF0000] transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="mailto:teamsathithya@gmail.com"
                className="text-gray-400 hover:text-[#d4af37] transition-colors"
                aria-label="Email"
              >
                <MdOutlineMail size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className="border-t border-gray-200 mt-12 mb-8"></div>

        {/* --- Bottom Copyright --- */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <div className="flex items-center gap-1">
            <FaRegCopyright size={10} />
            <span>2025 Athithya Brands. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
            <span>Designed with</span>
            <span className="text-red-400">♥</span>
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { FaInstagram, FaLinkedinIn, FaYoutube, FaRegCopyright } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 relative overflow-hidden">
      {/* Top Gold Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* --- Top Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* --- Column 1: Logo + Brand Story (Span 4) --- */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link to="/" className="inline-block mb-6">
              {/* Assuming you might want a white version of logo, or just use text if image doesn't work on dark. 
                     Using brightness filter to ensure visibility if it's a dark logo. */}
              <img
                src="/athithya-logo.png"
                alt="Athithya logo"
                className="w-36 brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 pr-4 text-justify">
              Connecting travellers with local hosts for authentic stays, cuisines, and experiences.
              Discover the real India through its people.
            </p>
          </div>

          {/* --- Column 2: Explore (Span 2) --- */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-bold text-white tracking-wide uppercase text-sm mb-6 border-b border-white/10 pb-2 inline-block">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/host" className="hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  For Host
                </Link>
              </li>
              <li>
                <Link to="/creators" className="hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  For Creators
                </Link>
              </li>
              <li>
                <Link to="/mentions" className="hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Special Mentions
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Column 3: Support (Span 2) --- */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-white tracking-wide uppercase text-sm mb-6 border-b border-white/10 pb-2 inline-block">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/support" className="hover:text-[#d4af37] transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-[#d4af37] transition-colors duration-300">
                  Safety Awareness
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#d4af37] transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#d4af37] transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Column 4: Stay Connected (Span 3) --- */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-white tracking-wide uppercase text-sm mb-6 border-b border-white/10 pb-2 inline-block">Connect With Us</h4>
            <p className="text-gray-400 text-sm mb-4">
              Join our community for the latest updates and stories.
            </p>
            {/* --- Social Icons --- */}
            <div className="flex gap-3 mb-8">
              <a
                href="https://www.instagram.com/athithya.in"
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#d4af37] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/athithya"
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#0077b5] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#ff0000] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="mailto:teamsathithya@gmail.com"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#d4af37] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Email"
              >
                <MdOutlineMail size={20} />
              </a>
            </div>

            <address className="not-italic text-sm leading-relaxed text-gray-500 border-l-2 border-[#d4af37] pl-4">
              <span className="font-semibold text-[#d4af37] block mb-1">Registered Address</span>
              Athithya Brands<br />
              Clement Town<br />
              Dehradun, Uttarakhand — 248001
            </address>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-medium tracking-wide">
            © 2025 Athithya Brands. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>Designed with</span>
            <span className="text-red-500">♥</span>
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

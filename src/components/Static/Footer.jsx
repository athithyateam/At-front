import { FaInstagram, FaLinkedinIn, FaYoutube, FaRegCopyright } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-yellow-400 text-gray-700">
      <div className="mx-auto px-12 py-4">
        {/* --- Top Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* --- Column 1: Logo + Address + About --- */}
          <div className="flex flex-col gap-4">
            <img
              src="/athithya-logo.png"
              alt="Athithya logo"
              className="w-32 mb-3"
            />
            <address className="not-italic text-sm leading-relaxed text-gray-600">
              <span className="font-semibold text-yellow-600">Registered Address:</span><br />
              Athithya Brands<br />
              Clement Town<br />
              Dehradun, Uttarakhand — 248001
            </address>
            <Link
              to="/about"
              className="text-gray-600 font-medium hover:text-yellow-600 transition mt-1"
            >
              About Us
            </Link>
          </div>

          {/* --- Column 2: Quick Links --- */}
          <div className="flex flex-col gap-2 md:items-center">
            <h4 className="font-semibold text-yellow-600 mb-1">Explore</h4>
            <Link to="/host" className="hover:text-yellow-600 transition">
              For Host
            </Link>
            <Link to="/creators" className="hover:text-yellow-600 transition">
              For Creators
            </Link>
            <Link to="/support" className="hover:text-yellow-600 transition">
              Support
            </Link>
            <Link to="/safety" className="hover:text-yellow-600 transition">
              Safety
            </Link>
          </div>

          {/* --- Column 3: Legal + Social --- */}
          <div className="flex flex-col gap-2 md:items-end">
            <h4 className="font-semibold text-yellow-600 mb-1">Important Information</h4>
            <Link to="/terms" className="hover:text-yellow-600 transition">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="hover:text-yellow-600 transition">
              Privacy Policy
            </Link>
            <Link to="/mentions" className="hover:text-yellow-600 transition">
              Special Mentions
            </Link>

            {/* --- Social Icons --- */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/athithya.in"
                target="_blank"
                rel="noreferrer noopener"
                className="text-yellow-600 hover:text-yellow-500 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/athithya"
                target="_blank"
                rel="noreferrer noopener"
                className="text-yellow-600 hover:text-yellow-500 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-yellow-600 hover:text-yellow-500 transition"
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="mailto:teamsathithya@gmail.com"
                className="text-yellow-600 hover:text-yellow-500 transition"
                aria-label="Email"
              >
                <MdOutlineMail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className="border-t border-yellow-300 my-4"></div>

        {/* --- Bottom Copyright --- */}
        <div className="flex items-center justify-center text-sm text-gray-600 gap-1">
          <FaRegCopyright className="text-gray-500" size={12} />
          <span>2025 Athithya Brands. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}

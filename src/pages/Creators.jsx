import Carousel from "../components/Carousel";
import { FiMail, FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";

// import heroThumb from "/images/carousel-img1.png";
import smallImgA from "/images/carousel-img1.png";
import smallImgB from "/images/carousel-img2.png";
import smallImgC from "/images/carousel-img3.png";

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#fffaf3] to-white text-gray-800">
      {/* HERO / CAROUSEL */}
      <section className="w-full relative">
        <div className="w-full">
          <Carousel />
          {/* Gold linear overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#fff9e6]/50 pointer-events-none"></div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto px-4 md:px-6 lg:px-12 py-14">
        {/* Section Label */}
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-8 py-2 border border-[#d4af37] text-[#b8860b] rounded-full bg-white shadow-md text-sm font-semibold tracking-wider uppercase"
          >
            For Creators
          </motion.div>
        </div>

        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* LEFT image card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1 flex justify-center md:justify-start"
          >
            <div className="border border-[#f1d18a] rounded-xl p-4 bg-white shadow-lg w-full max-w-xs hover:shadow-2xl transition-all duration-300">
              <img
                src={smallImgA}
                alt="Creator sample"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </motion.div>

          {/* MIDDLE text card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="border border-[#f2e3b6] rounded-xl p-8 bg-white shadow-md hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-semibold text-[#b8860b] mb-3">At Athithya</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We believe in the power of poststelling and the magic that travel and living
                experiences bring to our lives. Our mission is to amplify voices that inspire others
                to explore, connect, and grow. Whether you’re a blogger, creator, or traveler, we
                provide the platform and community that helps you turn your passion into influence.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Main Section Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT large content box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="h-full border border-[#f1d18a] bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300">
              <p className="text-sm leading-relaxed mb-5">
                <span className="font-semibold text-[#b8860b]">Our philosophy</span> is simple:
                meaningful connections comes from posts telling. We want to empower emerging
                voices, giving them the visibility they deserve. Through our initiative, we help
                small creators, bloggers, and poststellers shine brighter.
              </p>
              <p className="text-sm leading-relaxed mb-5">
                If you believe that with the right opportunity you could make a big impact in the
                travel world — let’s talk! Join our growing community and share your journey with
                the world.
              </p>

              <div className="mt-6 text-sm space-y-3">
                <p className="flex items-center gap-2 text-gray-700">
                  <FiPhone className="text-[#b8860b]" />
                  <span>+91-9389860637</span>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <FiMail className="text-[#b8860b]" />
                  <span>teamsathithya@gmail.com</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Image + CTA grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Image Cards */}
            {[smallImgB, smallImgC].map((img, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="border border-[#f2e3b6] rounded-xl p-4 bg-white w-full max-w-sm shadow-lg">
                  <img
                    src={img}
                    alt={`photo-${idx}`}
                    className="w-full h-44 object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}

            {/* Spotlight */}
            <div className="flex items-start justify-center">
              <div className="w-full max-w-sm h-[180px] border border-[#f2e3b6] rounded-xl bg-white p-6 flex flex-col items-center justify-center text-sm text-gray-700 shadow-md">
                <div className="text-xs uppercase tracking-wide mb-1 text-[#b8860b]">Spotlight</div>
                <div className="font-medium">Want to be featured?</div>
              </div>
            </div>

            {/* CTA Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-center"
            >
              <div className="w-full max-w-sm border border-[#f1d18a] rounded-xl p-8 bg-gradient-to-b from-white to-[#fffaf0] shadow-lg text-center">
                <div className="text-sm font-semibold mb-3 text-[#b8860b]">Interested?</div>
                <p className="text-xs text-gray-600 mb-5">
                  Let’s collaborate and craft something truly inspiring together.
                </p>
                <a
                  href="mailto:teamsathithya@gmail.com"
                  className="inline-block px-5 py-2 bg-gradient-to-r from-[#b8860b] to-[#d4af37] text-white rounded-md text-sm font-medium shadow hover:from-[#a67c00] hover:to-[#c5a028] transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

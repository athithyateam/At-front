import Carousel from "../components/Carousel";
import { FiMail, FiPhone, FiInstagram } from "react-icons/fi";
import { motion } from "framer-motion";

import creator1 from "/images/creator-1.jpg";
import creator2 from "/images/creator-2.jpeg";
import creator3 from "/images/creator-3.jpeg";

const GOLD = "#C9A24D";
const TEXT_PRIMARY = "#5F5646";
const TEXT_SECONDARY = "#7A715E";

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* HERO / CAROUSEL */}
      <section className="w-full relative">
        <div className="w-full">
          <Carousel />
          {/* Gold linear overlay to blend into white */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white pointer-events-none"></div>
        </div>
      </section>

      {/* CONTENT WRAPPER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">

        {/* HEADER BADGE */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-8 py-2.5 border rounded-full bg-white shadow-md text-sm font-bold tracking-widest uppercase"
            style={{
              borderColor: GOLD,
              color: GOLD
            }}
          >
            For Creators
          </motion.div>
        </div>

        {/* SECTION 1: Intro + Image Left */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">

          <motion.div
            className="w-full md:w-1/3"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-2 border rounded-2xl bg-white shadow-xl" style={{ borderColor: `${GOLD}33` }}>
              <img
                src={creator1}
                alt="Creator 1"
                className="w-full h-[350px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-2/3 text-left"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: GOLD }}>At Athithya</h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: TEXT_SECONDARY }}>
              We believe in the power of storytelling and the magic that travel and living
              experiences bring to our lives. Our mission is to amplify voices that inspire others
              to explore, connect, and grow.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: TEXT_SECONDARY }}>
              Whether you’re a blogger, creator, or traveler, we
              provide the platform and community that helps you turn your passion into influence.
            </p>
          </motion.div>
        </div>


        {/* SECTION 2: Philosophy + Image Right */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-24">

          <motion.div
            className="w-full md:w-1/3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-2 border rounded-2xl bg-white shadow-xl" style={{ borderColor: `${GOLD}33` }}>
              <img
                src={creator2}
                alt="Creator 2"
                className="w-full h-[350px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-2/3 text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: GOLD }}>Our Philosophy</h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: TEXT_SECONDARY }}>
              <span className="font-semibold" style={{ color: TEXT_PRIMARY }}>Simple: </span>
              Meaningful connection comes from authentic storytelling. We want to empower emerging
              voices, giving them the visibility they deserve.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: TEXT_SECONDARY }}>
              Through our initiative, we help small creators, bloggers, and storytellers shine brighter.
              If you believe that with the right opportunity you could make a big impact in the
              travel world — let’s talk!
            </p>
          </motion.div>

        </div>


        {/* SECTION 3: Community & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Image Card */}
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-2 border rounded-2xl bg-white shadow-xl h-full" style={{ borderColor: `${GOLD}33` }}>
              <img
                src={creator3}
                alt="Creator 3"
                className="w-full h-full min-h-[300px] md:min-h-[400px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Right: Contact Box */}
          <motion.div
            className="w-full h-full flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div
              className="p-8 md:p-12 rounded-2xl bg-[#fffcf5] border text-center md:text-left h-full flex flex-col justify-center"
              style={{ borderColor: `${GOLD}33` }}
            >
              {/* Spotlight Badge */}
              <div className="mb-4 inline-block px-3 py-1 rounded-md bg-yellow-50 border border-yellow-200 text-xs font-semibold uppercase tracking-wider text-[#b8860b] self-center md:self-start">
                Spotlight: Want to be featured?
              </div>

              <h3 className="text-2xl font-bold mb-4" style={{ color: GOLD }}>Join our Growing Community</h3>
              <p className="mb-8 font-medium" style={{ color: TEXT_SECONDARY }}>
                Share your journey with the world. Let’s collaborate and craft something truly inspiring together.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <span className="p-3 bg-white rounded-full shadow-sm text-yellow-600">
                    <FiMail size={20} />
                  </span>
                  <span className="text-lg" style={{ color: TEXT_PRIMARY }}>teamsathithya@gmail.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <span className="p-3 bg-white rounded-full shadow-sm text-yellow-600">
                    <FiPhone size={20} />
                  </span>
                  <span className="text-lg" style={{ color: TEXT_PRIMARY }}>+91-9389860637</span>
                </div>
              </div>

              <div className="mt-auto">
                <a
                  href="mailto:teamsathithya@gmail.com"
                  className="inline-block w-full md:w-auto px-8 py-4 text-center text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, #b8860b)` }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>

        </div>

      </section>
    </main>
  );
}

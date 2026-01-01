import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiCompass, FiHeart, FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";

const GOLD = "#C9A24D";
const TEXT_PRIMARY = "#5F5646";
const TEXT_SECONDARY = "#7A715E";
const TEXT_MUTED = "#9A8F79";

/* ---------- Reusable Section ---------- */
const Section = ({ icon: Icon, title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    viewport={{ once: true }}
    className="mb-16"
  >
    <h2
      className="flex items-center gap-3 text-lg md:text-xl font-semibold mb-5"
      style={{ color: GOLD }}
    >
      <span className="p-2 rounded-xl" style={{ backgroundColor: `${GOLD}1A` }}>
        <Icon style={{ color: GOLD }} />
      </span>
      {title}
    </h2>

    <div
      className="text-sm md:text-base leading-relaxed space-y-4"
      style={{ color: TEXT_PRIMARY }}
    >
      {children}
    </div>
  </motion.section>
);

/* ---------- Image Component ---------- */
const Photo = ({ src, alt, size = "md" }) => {
  const sizes = {
    sm: "max-h-[220px]",
    md: "max-h-[320px]",
    lg: "max-h-[420px]",
  };

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`w-full ${sizes[size]} rounded-xl my-8 object-cover`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    />
  );
};

/* ---------- About Us ---------- */
export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen px-4 py-14 mt-10">
      <div
        className="max-w-8xl mx-6 bg-white shadow-sm rounded-2xl p-8"
        style={{ border: `1px solid ${GOLD}33` }}
      >
        {/* ---------- Header ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ color: GOLD }}
          >
            About Us
          </h1>

          <p
            className="text-sm md:text-base mt-5"
            style={{ color: TEXT_SECONDARY }}
          >
            At Athithya, we believe that travelling becomes more meaningful when
            you experience a place through the people who live there — the
            locals. Athithya connects travellers with local hosts who offer
            authentic stays and activities, local cuisines, outdoor adventures,
            guided experiences, cultural lifestyle, and much more — all offered
            by locals.
          </p>
        </motion.div>

        {/* ---------- HERO IMAGE ---------- */}
        <Photo
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da"
          alt="Travellers with local host"
        />

        {/* ---------- Core Belief ---------- */}
        <Section icon={FiCompass} title="What We Believe">
          <p>
            We believe the world is a family we just haven’t met yet. With our
            <strong> Connect </strong> feature, travellers can share and join
            travel plans and groups, and experience journeys alongside people
            with diverse stories, cultures, and roots.
          </p>

          {/* belief photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Photo
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
              alt="People planning journey together"
            />
            <Photo
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
              alt="Local people with travellers"
            />
          </div>

          <p>
            At its core, Athithya is a travel experience platform that
            seamlessly combines the warmth of local hosting with the
            interactivity of social media — offering travel enthusiasts a
            complete, meaningful, and immersive travelling experience.
          </p>
        </Section>

        {/* ---------- Vision ---------- */}
        <Section icon={FiGlobe} title="Our Vision">
          <p>
            We strive to make every travel journey more meaningful — rich in
            local experiences and stories that stay with you for a lifetime.
          </p>

          <Photo
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="Indian village landscape"
          />

          <p>
            For our hosts, we aim to create a platform that celebrates India’s
            spirit of hospitality — <strong>“Atithi Devo Bhava”</strong> —
            giving locals the opportunity to showcase their warmth, culture,
            traditions, and roots to the world.
          </p>

          <p>
            Our goal isn’t just tourism. It’s human connection — built through
            shared stories and the people we meet along the way.
          </p>

          <p>
            We envision a future where anyone can explore India not as a visitor
            from another state or country, but as a friend — guided by the
            hearts, culture, homes of local people, and the hospitality of us,
            i.e. <strong>Indians</strong>.
          </p>
        </Section>

        {/* ---------- Heart ---------- */}
        <Section icon={FiHeart} title="The Heart of Athithya">
          <p>
            Just imagine — travelling begins as an escape from routine, but
            somewhere along the way, the world starts to feel like a family.
          </p>

          <Photo
            src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9"
            alt="People laughing and sharing stories"
          />

          <p>
            One morning you’re watching the sunrise in a village you never knew
            existed, and by evening you’re sharing stories over freshly cooked
            local food with people who were strangers just hours ago.
          </p>

          <p>
            You try to learn new languages, hear stories older than our
            grandparents, laugh at shared jokes, sing local songs, dance in
            traditional attire — and slowly realise that this journey is
            changing you.
          </p>

          <p>That’s the true essence of Athithya — and the people behind it.</p>
        </Section>

        {/* ---------- Team ---------- */}
        <Section icon={FiUsers} title="Meet Our Team">
          <Photo
            src="https://images.unsplash.com/photo-1552664730-d307ca884978"
            alt="Team working together"
          />

          <p>
            Athithya is built by people who believe in stories, community, and
            the power of genuine human connections.
          </p>

          <Link to="/mentions">
            <strong>#TeamAthithya</strong>
          </Link >
        </Section>

        {/* ---------- Footer ---------- */}
        <div
          className="mt-20 text-center text-sm font-medium"
          style={{ color: GOLD }}
        >
          Come. Connect. Experience travel the Athithya way.
        </div>

        <div className="mt-8 text-center text-xs" style={{ color: TEXT_MUTED }}>
          © Athithya — Connecting travellers & locals through stories.
        </div>
      </div>
    </div>
  );
}

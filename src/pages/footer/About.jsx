import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiCompass, FiHeart, FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";

const GOLD = "#C9A24D";
const TEXT_PRIMARY = "#5F5646";
const TEXT_SECONDARY = "#7A715E";

/* ---------- Reusable Components ---------- */
const ContentRow = ({
  image,
  title,
  icon: Icon,
  children,
  reverse = false,
  isMainTitle = false,
}) => {
  return (
    <div
      className={`flex flex-col gap-10 md:gap-20 items-center justify-between mb-24 ${reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
    >
      {/* IMAGE SIDE */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="relative group overflow-hidden rounded-2xl shadow-xl">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-[300px] md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </motion.div>

      {/* TEXT SIDE */}
      <motion.div
        className="w-full md:w-1/2 text-left"
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Title Section */}
        <div className="mb-6">
          {isMainTitle ? (
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: GOLD }}
            >
              About Us
            </h1>
          ) : (
            <h2
              className="flex items-center gap-3 text-2xl md:text-3xl font-semibold"
              style={{ color: GOLD }}
            >
              {Icon && (
                <span
                  className="p-2.5 rounded-xl shadow-sm"
                  style={{ backgroundColor: `${GOLD}1A` }}
                >
                  <Icon className="w-6 h-6" style={{ color: GOLD }} />
                </span>
              )}
              {title}
            </h2>
          )}
        </div>

        {/* Text Content */}
        <div
          className="text-base md:text-lg leading-relaxed space-y-6"
          style={{ color: TEXT_SECONDARY }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};

/* ---------- About Us Page ---------- */
export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section 1: Intro */}
        <ContentRow
          image="/images/about-1.jpeg"
          title="About Us"
          isMainTitle={true}
        >
          <p>
            At Athithya, we believe that travelling becomes more meaningful when
            you experience a place through the people who live there — the
            locals. Athithya connects travellers with local hosts who offer
            authentic stays and activities, local cuisines, outdoor adventures,
            guided experiences, cultural lifestyle, and much more — all offered
            by locals.
          </p>
        </ContentRow>

        {/* Section 2: What We Believe */}
        <ContentRow
          image="/images/about-2.jpeg"
          title="What We Believe"
          icon={FiCompass}
          reverse={true}
        >
          <p>
            We believe the world is a family we just haven’t met yet. With our
            <strong> Connect </strong> feature, travellers can share and join
            travel plans and groups, and experience journeys alongside people
            with diverse stories, cultures, and roots.
          </p>
          <p>
            At its core, Athithya is a travel experience platform that
            seamlessly combines the warmth of local hosting with the
            interactivity of social media — offering travel enthusiasts a
            complete, meaningful, and immersive travelling experience.
          </p>
        </ContentRow>

        {/* Section 3: Our Vision */}
        <ContentRow
          image="/images/about-3.jpeg"
          title="Our Vision"
          icon={FiGlobe}
        >
          <p>
            We strive to make every travel journey more meaningful — rich in
            local experiences and stories that stay with you for a lifetime.
          </p>
          <p>
            For our hosts, we aim to create a platform that celebrates India’s
            spirit of hospitality — <strong>“Atithi Devo Bhava”</strong> —
            giving locals the opportunity to showcase their warmth, culture,
            traditions, and roots to the world. Our goal isn’t just tourism.
            It’s human connection — built through shared stories and the people
            we meet along the way.
          </p>
          <p>
            We envision a future where anyone can explore India not as a visitor
            from another state or country, but as a friend — guided by the
            hearts, culture, homes of local people, and the hospitality of us,
            i.e. <strong>Indians</strong>.
          </p>
        </ContentRow>

        {/* Section 4: The Heart of Athithya */}
        <ContentRow
          image="/images/about-4.jpeg"
          title="The Heart of Athithya"
          icon={FiHeart}
          reverse={true}
        >
          <p>
            Just imagine — travelling begins as an escape from routine, but
            somewhere along the way, the world starts to feel like a family.
          </p>
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
        </ContentRow>

        {/* Section 5: Team */}
        <ContentRow
          image="/images/about-5.jpeg"
          title="Meet Our Team"
          icon={FiUsers}
        >
          <p>
            Athithya is built by people who believe in stories, community, and
            the power of genuine human connections.
          </p>
          <div className="pt-2">
            <Link
              to="/mentions"
              className="inline-block px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl active:scale-95"
              style={{ backgroundColor: GOLD }}
            >
              Meet the Team
            </Link>
          </div>
        </ContentRow>

        {/* Footer Text */}
        <div className="mt-12 md:mt-24 text-center space-y-4">
          <h3
            className="text-xl md:text-2xl font-serif italic"
            style={{ color: GOLD }}
          >
            "Come. Connect. Experience travel the Athithya way."
          </h3>
          <p className="text-sm font-medium opacity-60" style={{ color: TEXT_PRIMARY }}>
            © Athithya — Connecting travellers & locals through stories.
          </p>
        </div>

      </div>
    </div>
  );
}

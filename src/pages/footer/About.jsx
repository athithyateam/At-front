import React from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiCompass, FiHeart, FiGlobe } from "react-icons/fi";

const GOLD = "#C9A24D";

/* ---------- Reusable Content Row ---------- */
const ContentRow = ({
  image,
  title,
  icon: Icon,
  children,
  reverse = false,
  isMainTitle = false,
}) => {
  return (
    <section className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 ${reverse ? "md:flex-col-reverse" : ""}`}>
      {/* IMAGE SIDE */}
      <div className={`w-full ${reverse ? "md:order-2" : "md:order-1"} flex justify-center md:justify-${reverse ? 'end' : 'start'}`}>
        <div className="relative group w-full max-w-lg">
          <div className={`absolute -inset-3 bg-gradient-to-${reverse ? 'l' : 'r'} from-[#f1d18a] to-[#d4af37] rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-500`}></div>
          <div className={`relative border border-[#f1d18a] rounded-xl p-3 bg-white shadow-xl ${reverse ? 'rotate-[2deg]' : 'rotate-[-2deg]'} group-hover:rotate-0 transition duration-300`}>
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* TEXT SIDE */}
      <div className={`w-full ${reverse ? "md:order-1 text-right" : "md:order-2 text-left"}`}>
        {/* Title Section */}
        <div className={`mb-6 flex flex-col ${reverse ? "items-end" : "items-start"}`}>
          {isMainTitle ? (
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#b8860b] mb-4">
              About Us
            </h1>
          ) : (
            <h2 className="flex items-center gap-3 text-3xl font-bold text-[#b8860b] mb-4">
              {!reverse && Icon && (
                <span className="p-2 rounded-lg bg-[#fff9e6] text-[#b8860b] shadow-sm">
                  <Icon size={24} />
                </span>
              )}
              {title}
              {reverse && Icon && (
                <span className="p-2 rounded-lg bg-[#fff9e6] text-[#b8860b] shadow-sm">
                  <Icon size={24} />
                </span>
              )}
            </h2>
          )}
          <div className="h-1 w-20 bg-gradient-to-r from-[#b8860b] to-[#d4af37] rounded-full opacity-80"></div>
        </div>

        {/* Text Content */}
        <div className={`text-lg leading-relaxed space-y-6 text-gray-700 ${reverse ? "pl-0 md:pl-8" : "pr-0 md:pr-8"}`}>
          <div className={`${reverse ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-white to-[#fffaf3] p-6 rounded-2xl border border-[#f2e3b6] shadow-sm`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- About Us Page ---------- */
export default function AboutUs() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#fffaf3] to-white text-gray-800">

      {/* HEADER SPLASH */}
      <section className="pt-20 pb-10 text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#fff6dc] rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="inline-block px-6 py-2 mb-6 rounded-full bg-white text-sm font-semibold tracking-wider uppercase shadow-md border border-[#d4af37] text-[#b8860b]">
          Our Story
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#b8860b] mb-4 tracking-tight">Who We Are</h1>
        <p className="max-w-2xl mx-auto text-gray-600 px-4">
          A journey of connection, culture, and community.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">

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
          <p className="mb-4">
            We believe the world is a family we just haven’t met yet. With our
            <strong className="text-[#b8860b]"> Connect </strong> feature, travellers can share and join
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
          <p className="mb-4">
            We strive to make every travel journey more meaningful — rich in
            local experiences and stories that stay with you for a lifetime.
          </p>
          <p className="mb-4">
            For our hosts, we aim to create a platform that celebrates India’s
            spirit of hospitality — <strong className="text-[#b8860b]">“Atithi Devo Bhava”</strong> —
            giving locals the opportunity to showcase their warmth, culture,
            traditions, and roots to the world. Our goal isn’t just tourism.
            It’s human connection — built through shared stories and the people
            we meet along the way.
          </p>
          <p>
            We envision a future where anyone can explore India not as a visitor
            from another state or country, but as a friend — guided by the
            hearts, culture, homes of local people, and the hospitality of us,
            i.e. <strong className="text-[#b8860b]">Indians</strong>.
          </p>
        </ContentRow>

        {/* Section 4: The Heart of Athithya */}
        <ContentRow
          image="/images/about-4.jpeg"
          title="The Heart of Athithya"
          icon={FiHeart}
          reverse={true}
        >
          <p className="mb-4">
            Just imagine — travelling begins as an escape from routine, but
            somewhere along the way, the world starts to feel like a family.
          </p>
          <p className="mb-4">
            One morning you’re watching the sunrise in a village you never knew
            existed, and by evening you’re sharing stories over freshly cooked
            local food with people who were strangers just hours ago.
          </p>
          <p className="mb-4">
            You try to learn new languages, hear stories older than our
            grandparents, laugh at shared jokes, sing local songs, dance in
            traditional attire — and slowly realise that this journey is
            changing you.
          </p>
          <p className="font-semibold text-[#b8860b]">That’s the true essence of Athithya — and the people behind it.</p>
        </ContentRow>

        {/* Section 5: Team */}
        <ContentRow
          image="/images/about-5.jpeg"
          title="Meet Our Team"
          icon={FiUsers}
        >
          <p className="mb-6">
            Athithya is built by people who believe in stories, community, and
            the power of genuine human connections.
          </p>
          <div className="pt-2">
            <Link
              to="/special-mentions"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-white font-semibold shadow-lg shadow-[#d4af37]/20 transition transform hover:-translate-y-1 hover:shadow-xl
                        bg-gradient-to-r from-[#b8860b] to-[#d4af37]
                        hover:from-[#a67c00] hover:to-[#caa233]"
            >
              <span>Meet the Team</span>
            </Link>
          </div>
        </ContentRow>

        {/* Footer Text */}
        <div className="mt-12 md:mt-24 text-center space-y-6 relative py-12 border-t border-[#f2e3b6]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#d4af37] rounded-b-full opacity-50"></div>
          <h3
            className="text-2xl md:text-3xl font-serif italic text-[#b8860b]"
          >
            "Come. Connect. Experience travel the Athithya way."
          </h3>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            © Athithya — Connecting travellers & locals through stories.
          </p>
        </div>

      </div>
    </main>
  );
}

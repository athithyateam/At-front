import { FiMail, FiPhone } from "react-icons/fi";

import creator1 from "/images/creator-1.jpg";
import creator2 from "/images/creator-2.jpeg";
import creator3 from "/images/creator-3.jpeg";

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#fffaf3] to-white text-gray-800">

      {/* HEADER SECTION */}
      <section className="pt-20 pb-10 text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#fff6dc] rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="inline-block px-6 py-2 mb-6 rounded-full bg-white text-sm font-semibold tracking-wider uppercase shadow-md border border-[#d4af37] text-[#b8860b]">
          Community & Growth
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#b8860b] mb-4 tracking-tight">For Creators</h1>
        <p className="max-w-2xl mx-auto text-gray-600 px-4">
          Amplifying voices that inspire others to explore, connect, and grow.
        </p>
      </section>

      {/* CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-12 pb-24 space-y-16">

        {/* SECTION 1: AT ATHITHYA */}
        {/* Split layout: Image Left, Text Right */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-1 md:order-1 flex justify-center md:justify-start">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#f1d18a] to-[#d4af37] rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
              <div className="relative border border-[#f1d18a] rounded-xl p-3 bg-white shadow-xl rotate-[-2deg] hover:rotate-0 transition duration-300">
                <img
                  src={creator1}
                  alt="Creator 1"
                  className="w-full max-w-sm md:max-w-md h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="order-2 md:order-2 md:pl-8">
            <div className="bg-white/50 backdrop-blur-sm border-l-4 border-[#d4af37] p-6 rounded-r-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-[#8a6d1f]">At Athithya</h2>
              <p className="text-lg leading-relaxed text-gray-700 italic mb-4">
                "We believe in the power of storytelling and the magic that travel and living
                experiences bring to our lives."
              </p>
              <p className="text-gray-600">
                Whether you’re a blogger, creator, or traveler, we provide the platform and community that helps you turn your passion into influence.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR PHILOSOPHY */}
        {/* Split layout: Text Left, Image Right */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 md:pr-8">
            <div className="bg-white/50 backdrop-blur-sm border-r-4 border-[#d4af37] p-6 rounded-l-xl shadow-sm text-right md:text-right">
              <h2 className="text-2xl font-semibold mb-4 text-[#8a6d1f]">Our Philosophy</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                <span className="font-bold text-[#b8860b]">Simple: </span>
                Meaningful connection comes from authentic storytelling. We want to empower emerging
                voices, giving them the visibility they deserve.
              </p>
              <p className="text-gray-600">
                Through our initiative, we help small creators, bloggers, and storytellers shine brighter.
                If you believe that with the right opportunity you could make a big impact in the
                travel world — let’s talk!
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-l from-[#f1d18a] to-[#d4af37] rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
              <div className="relative border border-[#f1d18a] rounded-xl p-3 bg-white shadow-xl rotate-[2deg] hover:rotate-0 transition duration-300">
                <img
                  src={creator2}
                  alt="Creator 2"
                  className="w-full max-w-sm md:max-w-md h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: JOIN COMMUNITY BANNER */}
        {/* Full width centered banner */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#f2e3b6] rounded-2xl p-6 lg:p-8 shadow-lg overflow-hidden relative">

          {/* Background texture */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fff6dc] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>

          <div className="lg:col-span-5 relative z-10 flex justify-center lg:justify-start">
            <div className="border border-[#f1d18a] rounded-xl p-2 bg-white shadow-md">
              <img
                src={creator3}
                alt="Join Community"
                className="w-full h-auto max-h-[300px] object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="lg:col-span-7 relative z-10 text-center lg:text-left">
            <div className="mb-4 inline-block px-3 py-1 rounded-md bg-[#fff9e6] border border-[#f2e3b6] text-xs font-semibold uppercase tracking-wider text-[#b8860b]">
              Spotlight: Want to be featured?
            </div>
            <h3 className="text-3xl font-bold text-[#b8860b] mb-4">Join our Growing Community</h3>
            <p className="text-gray-700 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              Share your journey with the world. Let’s collaborate and craft something truly inspiring together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2 bg-[#fffcf5] px-4 py-2 rounded-full shadow-sm border border-[#f2e3b6]">
                <FiPhone className="text-[#b8860b]" />
                <span>+91-9389860637</span>
              </div>
              <div className="flex items-center gap-2 bg-[#fffcf5] px-4 py-2 rounded-full shadow-sm border border-[#f2e3b6]">
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
                <span>Contact Us</span>
                <FiMail />
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

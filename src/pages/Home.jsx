import VideoCarousel from "../components/Home/VideoCarousel";
// import AboutOfferings from "../components/Home/AboutOfferings";
import ScrollStorySection from "../components/Home/ScrollStorySection";
import InstagramSection from "../components/Home/InstagramSection";
import { FaArrowRightLong } from "react-icons/fa6";


export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <VideoCarousel />
      {/* <AboutOfferings /> */}
      <ScrollStorySection />

      <InstagramSection />

      {/* Become a Host CTA */}
      <section className="py-10 px-4 md:px-12 bg-white">
        <div className="bg-[#FFF4D6] border border-yellow-300 rounded-2xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#C59A2F] mb-2">
              Become a Host
            </h2>
            <p className="text-sm md:text-base text-gray-700 max-w-xl">
              Turn your home, trek, or local experience into an income stream.
              List your stay or adventure, set your own prices, and host
              travellers your way.
            </p>
          </div>
          <button className="gold-cta-x h-12 relative inline-flex items-center px-8 md:px-12 py-3 rounded-sm font-medium transition-all duration-300 bg-[#C59A2F] text-white shadow-lg cursor-pointer hover:bg-[#b68923]">
            Start Hosting
            <span className="ml-2">
              <FaArrowRightLong />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

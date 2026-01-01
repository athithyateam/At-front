import VideoCarousel from "../components/Home/VideoCarousel";
// import AboutOfferings from "../components/Home/AboutOfferings";
import ScrollStorySection from "../components/Home/ScrollStorySection";
import InstagramSection from "../components/Home/InstagramSection";
import WhyAthithyaSection from "../components/Home/WhyAthithyaSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <VideoCarousel />
      {/* <AboutOfferings /> */}
      <ScrollStorySection />
      <WhyAthithyaSection />
      <InstagramSection />
    </div>
  );
}

// src/pages/Explore.jsx
import { FaArrowRightLong } from "react-icons/fa6";

import { motion } from "framer-motion";
import SearchBar from "../components/Search";

// Layout
import CarouselRow from "../components/CarouselRow";

// Cards
import LocationCard from "../components/cards/LocationCard";
import FeaturedTrekCard from "../components/cards/FeaturedTrekCard";
import StayCard from "../components/cards/StayCard";
// import CollectionCard from "../components/cards/CollectionCard";
import HostCard from "../components/cards/HostCard";
// import TestimonialCard from "../components/cards/TestimonialCard";
import BlogCard from "../components/cards/BlogCard";
import { useNavigate } from "react-router-dom";
import FeaturedTreks from "../components/explore/FeaturedTreks";
import TopRatedTreks from "../components/explore/TopRatedTreks";
import TopRatedHosts from "../components/explore/TopRatedHosts";
import NearbyTreks from "../components/explore/TreksNearbyYou";
import AllExperiences from "../components/explore/AllExperiences";

// Import data
import { placesData } from "../data/places";

const Explore = () => {
  const navigate = useNavigate();

  // Transform data for the carousel
  // Transform data for the carousel
  const locations = placesData.map((data) => ({
    city: data.name,
    image: data.bannerImage,
    id: data.id,
  }));

  console.log("Explore locations:", locations);

  const staysNear = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Mountain View Homestay",
      location: "Manali, Himachal",
      price: "₹1,800 / night",
      rating: 4.8,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Lakeside Wooden Cabin",
      location: "Nainital, Uttarakhand",
      price: "₹2,200 / night",
      rating: 4.7,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Tea Estate Bungalow",
      location: "Munnar, Kerala",
      price: "₹2,900 / night",
      rating: 4.9,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Mountain View Homestay",
      location: "Manali, Himachal",
      price: "₹1,800 / night",
      rating: 4.8,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Mountain View Homestay",
      location: "Manali, Himachal",
      price: "₹1,800 / night",
      rating: 4.8,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Mountain View Homestay",
      location: "Manali, Himachal",
      price: "₹1,800 / night",
      rating: 4.8,
    },
  ];
  //   {
  //     name: "Sneha & Karan",
  //     trip: "Kedarkantha Trek",
  //     text: "Flawlessly organized – from stay to food to safety. Our first winter trek felt super secure.",
  //     image:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  //   },
  //   {
  //     name: "Vivek",
  //     trip: "Mountain View Homestay",
  //     text: "Felt like staying with family. The host helped us plan our entire Plan.",
  //     image:
  //       "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop",
  //   },
  //   {
  //     name: "Priya",
  //     trip: "Valley of Flowers Trek",
  //     text: "Everything was exactly as shown. Clean camps and very friendly guides.",
  //     image:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  //   },
  //   {
  //     name: "Priya",
  //     trip: "Valley of Flowers Trek",
  //     text: "Everything was exactly as shown. Clean camps and very friendly guides.",
  //     image:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  //   },
  //   {
  //     name: "Priya",
  //     trip: "Valley of Flowers Trek",
  //     text: "Everything was exactly as shown. Clean camps and very friendly guides.",
  //     image:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  //   },
  // ];

  const blogs = [
    {
      title: "Top Places In Uttarakhand",
      image:
        "https://lp-cms-production.imgix.net/2022-03/GettyRF_956963154.jpg?auto=format,compress&q=72&w=1095&fit=crop&crop=faces,edges",
      readTime: "6 min read",
      to: "/guides/top-7-himalayan-treks",
    },
    {
      title: "Best Treks In Uttarakhand",
      image:
        "https://www.bikatadventures.com/images/BlogspotContents/BlogspotImageUrl64790.jpg",
      readTime: "5 min read",
      to: "/guides/best-treks-uttarakhand",
    },
    {
      title: "Best Season to Visit Uttarakhand",
      image:
        "https://www.privatetajtour.com/wp-content/uploads/2024/09/1584012579_10_5.jpg.webp",
      readTime: "4 min read",
      to: "/guides/best-season-to-visit-uttarakhand",
    },
    {
      title: "Uttarakhand Itineraries",
      image:
        "https://thumbs.dreamstime.com/b/devprayag-uttarakhand-india-28233199.jpg",
      readTime: "5 min read",
      to: "/guides/uttarakhand-itineraries",
    },
    {
      title: "Uttarakhand Travel Cost",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2O8aBIuLmoyJRUnMr35xp4nUtB4i_SvoKsQ&s",
      readTime: "3 min read",
      to: "/guides/uttarakhand-travel-cost",
    },
    {
      title: "Uttarakhand Packing List",
      image:
        "https://www.swantour.com/blogs/wp-content/uploads/2018/12/Packages-Tips.jpg",
      readTime: "6 min read",
      to: "/guides/uttarakhand-packing-list",
    },
    {
      title: "Uttarakhand Travel Tips",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1cc5TbBNlH4vzoRj2Mh7l8zGmJN7jlEboA&s",
      readTime: "6 min read",
      to: "/guides/uttarakhand-travel-tips",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[500px] md:h-[650px] flex items-center justify-center">
        {/* Banner Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2048&auto=format&fit=crop"
            alt="Uttarakhand Banner"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay with Gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
              Experience the Soul of <span className="text-[#d5ad37]">Uttarakhand</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto drop-shadow-lg font-medium leading-relaxed">
              Discover hidden trails, connect with authentic local hosts, and immerse yourself in the divine beauty of the Himalayas.
            </p>
            <div className="w-full max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Top Locations */}
      <CarouselRow
        title="Top Locations in Uttarakhand"
        subtitle="Explore the most loved states and cities"
        actionLabel="View all"
        backgroundClass="bg-white"
      >
        {locations.map((loc, idx) => (
          <LocationCard
            key={idx}
            image={loc.image}
            city={loc.city}
            onClick={() => navigate(`/place/${loc.id}`)}
          />
        ))}
      </CarouselRow>

      {/* Explore Experiences */}
      <CarouselRow
        title="Explore Experiences"
        subtitle="Discover all adventures added by our host community"
        actionLabel="Explore all"
        backgroundClass="bg-[#FFF9EC]"
      >
        <AllExperiences />
      </CarouselRow>

      {/* Featured Experiences */}
      <CarouselRow
        title="Featured Experiences"
        subtitle="Handpicked adventures curated by verified hosts"
        actionLabel="Explore all"
        backgroundClass="bg-white"
      >
        <FeaturedTreks />
      </CarouselRow>

      {/* Treks Nearby You */}
      <CarouselRow
        title="Experiences Nearby You"
        subtitle="Discover adventures close to your location"
        actionLabel="View all"
        backgroundClass="bg-[#FFF9EC]"
      >
        <NearbyTreks />
      </CarouselRow>

      {/* Top Rated Treks */}
      <CarouselRow
        title="Top Rated Experiences"
        subtitle="Highly rated by real trekkers"
        actionLabel="View all treks"
        backgroundClass="bg-white"
      >
        <TopRatedTreks />
      </CarouselRow>

      {/* Top Hosts */}
      <CarouselRow
        title="Top Rated Hosts"
        subtitle="Trusted experts loved by travelers"
        actionLabel="Meet all hosts"
        backgroundClass="bg-[#FFF9EC]"
      >
        <TopRatedHosts />
      </CarouselRow>

      {/* Blogs */}
      <CarouselRow
        title="Travel Guides & Tips"
        subtitle="Learn before you go – curated by our team and hosts"
        actionTo="/guides"
        backgroundClass="bg-white"
      >
        {blogs.map((b, idx) => (
          <BlogCard key={idx} {...b} />
        ))}
      </CarouselRow>

      {/* Small scrollbar-hide helper for all horizontal rows (if not global already) */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default Explore;

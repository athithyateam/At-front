import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiClock, FiGrid, FiLayers, FiArrowRight } from "react-icons/fi";

const GUEST_TABS = [
  { key: "posts", label: "Posts", icon: <FiGrid className="w-4 h-4" /> },
  { key: "itineraries", label: "Itineraries", icon: <FiLayers className="w-4 h-4" /> },
];

export default function GuestProfile({ posts = [] }) {
  const [activeTab, setActiveTab] = useState("posts");

  const filteredPosts = useMemo(() => {
    if (activeTab === "posts")
      return posts.filter((p) => p.postType === "experience");

    if (activeTab === "itineraries")
      return posts.filter((p) => p.postType === "itinerary");

    return [];
  }, [activeTab, posts]);

  return (
    <div className="space-y-8 py-2">
      {/* Modern Pill Tabs */}
      <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl w-fit border border-gray-100">
        {GUEST_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === t.key
              ? "bg-white text-[#C59A2F] shadow-sm transform scale-[1.02]"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <span className={activeTab === t.key ? "text-[#C59A2F]" : "text-gray-300"}>
              {t.icon}
            </span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="col-span-full py-24 text-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-200 mb-4">
                <FiLayers className="w-8 h-8" />
              </div>
              <p className="text-gray-400 font-medium tracking-tight">Nothing shared here yet</p>
            </motion.div>
          ) : (
            filteredPosts.map((p, idx) => (
              <motion.article
                key={p._id || idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white border border-gray-200/60 shadow-sm rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-yellow-500/5 hover:border-yellow-100 transition-all duration-500"
              >
                {/* Visual Header */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.photos?.[0]?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop"}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-gray-800 shadow-sm">
                      {p.postType}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h4 className="w-full text-lg font-bold text-gray-900 group-hover:text-[#C59A2F] transition-colors line-clamp-1 mb-2 text-left">
                    {p.title}
                  </h4>

                  <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="text-[#C59A2F]" />
                      {p.location?.city || "Explorer"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiClock className="text-[#C59A2F]" />
                      {p.duration?.days || 0}d
                    </span>
                  </div>

                  <p className="w-full text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4 min-h-[40px] text-left">
                    {p.description || "Excited about this journey into the unknown!"}
                  </p>

                  <button className="flex items-center gap-2 text-xs font-bold text-[#C59A2F] group-hover:gap-3 transition-all duration-300">
                    READ STORY <FiArrowRight />
                  </button>
                </div>
              </motion.article>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

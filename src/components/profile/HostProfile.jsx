import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiClock, FiStar, FiGrid, FiLayers, FiBriefcase, FiChevronRight } from "react-icons/fi";

const HOST_TABS = [
  { key: "posts", label: "Posts", icon: <FiGrid className="w-4 h-4" /> },
  { key: "itineraries", label: "Itineraries", icon: <FiLayers className="w-4 h-4" /> },
  { key: "services", label: "Services", icon: <FiBriefcase className="w-4 h-4" /> },
];

export default function HostProfile({ posts = [], postStats = {}, reviewStats = {} }) {
  const [activeTab, setActiveTab] = useState("posts");

  const filteredPosts = useMemo(() => {
    if (activeTab === "posts")
      return posts.filter((p) => p.postType === "experience");

    if (activeTab === "services")
      return posts.filter((p) => p.postType === "service");

    if (activeTab === "itineraries")
      return posts.filter((p) => p.postType === "itinerary");

    return [];
  }, [activeTab, posts]);

  return (
    <div className="space-y-8 py-4">
      {/* Premium Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: postStats?.total || 0, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Services", value: postStats?.services || 0, color: "text-green-600", bg: "bg-green-50" },
          { label: "Rating", value: `⭐ ${reviewStats?.averageRating || "0.0"}`, color: "text-yellow-600", bg: "bg-yellow-50" },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} ${stat.color} p-4 rounded-2xl flex flex-col items-center justify-center border border-white/50 shadow-sm`}>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">{stat.label}</span>
            <span className="text-lg font-black">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Modern Filter Tabs */}
      <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl w-fit border border-gray-100">
        {HOST_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === t.key
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

      {/* Dynamic Grid Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200"
            >
              <FiLayers className="w-8 h-8 mx-auto text-gray-200 mb-2" />
              <div className="text-gray-400 text-sm font-medium">No {activeTab} available yet</div>
            </motion.div>
          ) : (
            filteredPosts.map((p, idx) => (
              <motion.article
                key={p._id || idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group bg-white border border-gray-200/60 shadow-sm rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-200/50 transition-all duration-500"
              >
                {/* Visual Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.photos?.[0]?.url || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop"}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide">
                      <FiMapPin className="text-yellow-400" />
                      {p.location?.city || "Uttarakhand"}
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5">
                  <h4 className="w-full font-bold text-gray-900 group-hover:text-[#C59A2F] transition-colors line-clamp-1 mb-2 text-left">
                    {p.title}
                  </h4>

                  <p className="w-full text-xs text-gray-500 line-clamp-2 min-h-[32px] mb-4 leading-relaxed text-left">
                    {p.description || "No description provided for this item."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {p.duration?.days || 0}d
                      </span>
                      {p.price?.amount && (
                        <span className="text-[#C59A2F] font-black tracking-normal lowercase first-letter:uppercase">
                          ₹{p.price.amount}
                        </span>
                      )}
                    </div>
                    <button className="p-2 rounded-full bg-gray-50 text-[#C59A2F] group-hover:bg-[#C59A2F] group-hover:text-white transition-all duration-300">
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

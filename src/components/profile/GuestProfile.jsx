import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiClock, FiGrid, FiLayers, FiArrowRight, FiEdit2, FiTrash2, FiMoreVertical } from "react-icons/fi";
import { deletePost, deleteItinerary } from "../../api/posts";

const GUEST_TABS = [
  { key: "posts", label: "Momentos", icon: <FiGrid className="w-4 h-4" /> },
  { key: "plans", label: "Plans", icon: <FiLayers className="w-4 h-4" /> },
];

export default function GuestProfile({ posts = [], isOwner = false }) {
  const [activeTab, setActiveTab] = useState("posts");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [localPosts, setLocalPosts] = useState(posts);
  const navigate = useNavigate();

  // Sync localPosts if posts prop changes
  useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeTab === "posts")
      return localPosts.filter((p) => p.postType === "experience");

    if (activeTab === "plans")
      return localPosts.filter((p) => p.postType === "plan");

    return [];
  }, [activeTab, localPosts]);

  const handleDelete = async (postId, postType) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      const token = localStorage.getItem("auth_token");
      if (postType === 'plan') {
        await deleteItinerary(postId, { token });
      } else {
        await deletePost(postId, { token });
      }
      setLocalPosts(prev => prev.filter(p => p._id !== postId));
      setOpenMenuId(null);
    } catch (err) {
      alert("Delete failed: " + (err.message || "Unknown error"));
    }
  };

  const handleEdit = (postId, postType) => {
    const typeMap = { 'experience': 'post', 'plan': 'plan' };
    navigate(`/post?edit=${postId}&type=${typeMap[postType] || 'post'}`);
    setOpenMenuId(null);
  };

  return (
    <div className="space-y-8 py-2">
      {/* Modern Pill Tabs - Responsive */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl w-max md:w-fit border border-gray-100 mx-auto md:mx-0">
          {GUEST_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === t.key
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
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="col-span-full py-24 text-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-101 flex flex-col items-center justify-center"
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
                className="group bg-white border border-gray-200/60 shadow-sm rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-yellow-500/5 hover:border-yellow-101 transition-all duration-500"
              >
                {/* Visual Header */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.photos?.[0]?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop"}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="flex-1 text-lg font-bold text-gray-900 group-hover:text-[#C59A2F] transition-colors line-clamp-1 text-left">
                      {p.title}
                    </h4>

                    {isOwner && (
                      <div className="relative shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const pid = p._id || p.id;
                            setOpenMenuId(openMenuId === pid ? null : pid);
                          }}
                          className="flex items-center justify-center p-1.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-[#C59A2F] border border-transparent hover:border-gray-200"
                        >
                          <FiMoreVertical size={20} />
                        </button>

                        <AnimatePresence>
                          {(openMenuId === (p._id || p.id)) && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(null);
                                }}
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-20 overflow-hidden"
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(p._id || p.id, p.postType);
                                  }}
                                  className="w-full px-4 py-2.5 text-left text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3"
                                >
                                  <FiEdit2 size={16} />
                                  Edit
                                </button>
                                <div className="h-px bg-gray-50 mx-2" />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(p._id || p.id, p.postType);
                                  }}
                                  className="w-full px-4 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                                >
                                  <FiTrash2 size={16} />
                                  Delete
                                </button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

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
                    {p.postType === 'service' ? 'VIEW EXPERIENCES' : 'READ STORY'} <FiArrowRight />
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

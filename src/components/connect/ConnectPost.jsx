import React, { useEffect, useMemo, useState } from "react";
import {
  FiMapPin,
  FiClock,
  FiTrendingUp,
  FiFilter,
  FiShare2,
  FiBookmark,
  FiSmile,
} from "react-icons/fi";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ENDPOINTS } from "../../api/allApi";
import PremiumSelect from "../PremiumSelect";

/* ---------------- Config ---------------- */

const EMOJIS = ["🔥", "❤️", "👍", "😍", "😮", "👏"];

/* ---------------- Motion ---------------- */

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

/* ---------------- Component ---------------- */

const ConnectPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("all");

  const [raised, setRaised] = useState({});
  const [saved, setSaved] = useState({});
  const [reactions, setReactions] = useState({});
  const [openPicker, setOpenPicker] = useState(null); // postId

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get(ENDPOINTS.POSTS);
      setPosts(res.data?.experiences || []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const locations = useMemo(() => {
    const set = new Set(
      posts
        .filter((p) => p.location?.city && p.location?.state)
        .map((p) => `${p.location.city}, ${p.location.state}`)
    );
    return ["all", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      return (
        location === "all" ||
        `${p.location?.city}, ${p.location?.state}` === location
      );
    });
  }, [posts, location]);

  /* ---------------- Actions ---------------- */

  function react(postId, emoji) {
    setReactions((prev) => ({
      ...prev,
      [postId]: {
        ...(prev[postId] || {}),
        [emoji]: (prev[postId]?.[emoji] || 0) + 1,
      },
    }));
    setOpenPicker(null);
  }

  function toggleRaise(postId) {
    setRaised((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
  }

  function handleShare(post) {
    const url = `${window.location.origin}/post/${post._id}`;
    navigator.share
      ? navigator.share({ title: post.title, url })
      : navigator.clipboard.writeText(url);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-72 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-xl px-4 py-3">
        <FiFilter className="text-gray-600" />
        <PremiumSelect
          value={location}
          onChange={setLocation}
          placeholder="Location"
          options={locations.map((l) => ({
            value: l,
            label: l === "all" ? "All locations" : l,
          }))}
        />
      </div>

      {/* Feed */}
      <motion.div layout className="grid gap-6">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.article
              key={post._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white border border-gray-300 rounded-2xl overflow-hidden"
            >
              {/* Image */}
              <div className="h-56 bg-gray-100">
                <img
                  src={
                    post.photos?.[0]?.url ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/330px-Placeholder_view_vector.svg.png"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 space-y-4">
                {/* Host */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center font-semibold">
                    {post.user?.firstname?.[0] || "H"}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      {post.user?.firstname} {post.user?.lastname}
                    </div>
                    <div className="text-xs text-gray-500">Trek host</div>
                  </div>
                </div>

                <h3 className="font-semibold text-lg">{post.title}</h3>

                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <FiMapPin /> {post.location.city}, {post.location.state}
                  </span>
                  <span className="flex items-center gap-1">
                    {post.duration?.days ? (
                      <span className="flex items-center gap-1">
                        <FiClock />
                        {post.duration.days} Day
                        {post.duration.days > 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">
                        Duration not specified
                      </span>
                    )}
                  </span>
                </div>

                <p className="text-sm text-gray-700 line-clamp-3">
                  {post.description}
                </p>

                {/* Existing reactions */}
                {reactions[post._id] && (
                  <div className="flex gap-3 text-sm">
                    {Object.entries(reactions[post._id]).map(([e, c]) => (
                      <span key={e}>
                        {e} {c}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="relative flex items-center justify-between pt-3 border-t border-gray-300">
                  {/* LEFT: Raise + React */}
                  <div className="flex items-center gap-4">
                    {/* Raise */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleRaise(post._id)}
                      className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full border  border-gray-300
                 hover:bg-gray-50 transition"
                    >
                      <FiTrendingUp />
                      Raise
                      {raised[post._id] && (
                        <span className="ml-1 font-semibold">
                          {raised[post._id]}
                        </span>
                      )}
                    </motion.button>

                    {/* React */}
                    <button
                      onClick={() =>
                        setOpenPicker(openPicker === post._id ? null : post._id)
                      }
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
                    >
                      <FiSmile />
                      React
                    </button>
                  </div>

                  {/* Emoji picker */}
                  <AnimatePresence>
                    {openPicker === post._id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-12 left-0 bg-white border border-gray-300 rounded-xl shadow-lg px-3 py-2 flex gap-2 z-20"
                      >
                        {EMOJIS.map((e) => (
                          <button
                            key={e}
                            onClick={() => react(post._id, e)}
                            className="text-xl hover:scale-125 transition"
                          >
                            {e}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* RIGHT: Save + Share */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        setSaved((s) => ({ ...s, [post._id]: !s[post._id] }))
                      }
                      className={`text-lg ${
                        saved[post._id] ? "text-yellow-500" : "text-gray-500"
                      }`}
                      title="Save"
                    >
                      <FiBookmark />
                    </button>

                    <button
                      onClick={() => handleShare(post)}
                      className="text-lg text-gray-500"
                      title="Share"
                    >
                      <FiShare2 />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ConnectPost;

// InstagramPlanPageOptimized.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiBookmark,
  FiMapPin,
} from "react-icons/fi";
import { motion } from "framer-motion";

/* same helpers and constants as before */
const LOCAL_IMAGE = "/mnt/data/7fb1df3a-9314-49dd-8495-51bfff57867a.png";
const IMAGES = [
  LOCAL_IMAGE,
  "https://images.pexels.com/photos/27100767/pexels-photo-27100767.jpeg",
  "https://images.pexels.com/photos/34858871/pexels-photo-34858871.jpeg",
  "https://images.pexels.com/photos/34799840/pexels-photo-34799840.jpeg",
  "https://images.pexels.com/photos/28010488/pexels-photo-28010488.jpeg",
];
const VIDEOS = [];
const ITEM_HEIGHT = 600;

// Intersection observer hook (unchanged)
function useNearScreen({ root = null, rootMargin = "200px" } = {}) {
  const [isNear, setIsNear] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsNear(entry.isIntersecting));
      },
      { root, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [root, rootMargin]);

  return [ref, isNear];
}

// PostRow expects index, style, data (keeps your original code mostly intact)
function PostRow({ index, style, data }) {
  const { posts, toggleLike, likedposts } = data;
  const post = posts[index];

  const [videoRef, isVideoNear] = useNearScreen({ rootMargin: "300px" });

  return (
    <div style={{ ...style, height: ITEM_HEIGHT }} className="p-3">
      <article
        className="bg-white border rounded-xl shadow-sm overflow-hidden card-gpu"
        style={{ borderColor: "#f3e9d0", height: ITEM_HEIGHT - 24 }}
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            style={{
              background: "linear-linear(135deg,#f6c93d 0%,#f3a200 100%)",
            }}
          >
            {post.user[0].toUpperCase()}
          </div>

          <div>
            <div className="font-semibold">{post.user}</div>
            <div className="text-xs text-gray-500">{post.time}</div>
          </div>
        </div>

        <div
          className="w-full bg-gray-100 flex items-center justify-center"
          style={{ height: 360 }}
        >
          {post.mediaType === "image" ? (
            <img
              src={post.media}
              alt={`post-${post.id}`}
              loading="lazy"
              decoding="async"
              width="1200"
              height="800"
              className="w-full h-full object-cover"
              style={{ maxHeight: 360 }}
            />
          ) : (
            <div ref={videoRef} className="w-full h-full">
              {isVideoNear ? (
                <video
                  src={post.media}
                  controls
                  className="w-full h-full object-cover bg-black"
                />
              ) : (
                <img
                  src={IMAGES[index % IMAGES.length]}
                  alt="video-poster"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="800"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-2"
              >
                <FiHeart
                  size={22}
                  style={{ color: likedposts[post.id] ? "#e11d48" : "inherit" }}
                />
              </motion.button>

              <FiMessageCircle size={22} />
              <FiSend size={22} />
            </div>

            <FiBookmark size={22} />
          </div>

          <div className="mt-3">
            <div className="font-semibold">
              {post.likes.toLocaleString()} likes
            </div>
            <div className="mt-2 text-sm">
              <span className="font-semibold">{post.user} </span>
              {post.caption}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function InstagramPlanPageOptimized() {
  const [view, setView] = useState("posts");
  const [likedposts, setLikedposts] = useState({});
  const listRef = useRef(null); // now a DOM scroll container ref

  const posts = Array.from({ length: 30 }).map((_, i) => {
    const isVideo = i % 6 === 5 && VIDEOS.length > 0;
    return {
      id: i + 1,
      user: ["rkive", "mansi", "tuktuk", "kashish"][i % 4],
      caption: `Caption for post #${
        i + 1
      } — exploring places, vibes and travel tips.`,
      mediaType: isVideo ? "video" : "image",
      media: isVideo ? VIDEOS[i % VIDEOS.length] : IMAGES[i % IMAGES.length],
      likes: Math.floor(1200 * (i + 1) * 3.14),
      time: `${i + 1}d`,
    };
  });

  const itineraries = [
    {
      id: 1,
      user: "Aisha",
      place: "Kasol, Himachal Pradesh",
      summary: "Planning 5-day trip ...",
      need: "money",
      dates: "Jan 10 - Jan 14",
    },
    {
      id: 2,
      user: "Rohan",
      place: "Manali, Himachal Pradesh",
      summary: "Leaves approved ...",
      need: "partner",
      dates: "Feb 5 - Feb 8",
    },
    {
      id: 3,
      user: "Neha",
      place: "Leh-Ladakh",
      summary: "Solo traveller ...",
      need: "group",
      dates: "Jun 1 - Jun 8",
    },
    {
      id: 4,
      user: "Vikram",
      place: "Rishikesh",
      summary: "Yoga + river trip ...",
      need: "partner",
      dates: "Mar 20 - Mar 22",
    },
  ];

  const toggleLike = useCallback((id) => {
    setLikedposts((s) => ({ ...s, [id]: !s[id] }));
  }, []);

  // scroll to top when switching to posts — now scroll container
  useEffect(() => {
    if (view === "posts" && listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [view]);

  const itemData = { posts, toggleLike, likedposts };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <style>{`
        .feed-scroll { -webkit-overflow-scrolling: touch; scroll-behavior: smooth; }
        .card-gpu { will-change: transform, opacity; backface-visibility: hidden; }
      `}</style>

      <div className="max-w-7xl mx-auto mt-16">
        <header
          className="flex items-center justify-end py-4 px-4 border-b sticky top-0 z-30 bg-white"
          style={{ borderColor: "#f3e9d0" }}
        >
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
              <button
                onClick={() => setView("posts")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  view === "posts"
                    ? "bg-linear-to-r from-yellow-400 to-yellow-300 text-white shadow"
                    : "text-gray-700"
                }`}
              >
                posts
              </button>
              <button
                onClick={() => setView("Plan")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  view === "Plan"
                    ? "bg-linear-to-r from-yellow-400 to-yellow-300 text-white shadow"
                    : "text-gray-700"
                }`}
              >
                Plan
              </button>
            </nav>
          </div>
        </header>

        <main className="flex flex-col lg:flex-row gap-6 p-6">
          <section className="flex-1">
            {view === "posts" ? (
              // Scrollable container replacing react-window List
              <div
                ref={listRef}
                className="feed-scroll"
                style={{
                  maxHeight: Math.min(window.innerHeight * 0.78, 900),
                  overflowY: "auto",
                }}
              >
                {posts.map((_, i) => (
                  // keep PostRow signature: index, style, data
                  <PostRow
                    key={posts[i].id}
                    index={i}
                    style={{}}
                    data={itemData}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-lg font-semibold mb-2">
                  People planning trips
                </div>
                <div className="flex flex-col gap-3 max-h-[60vh] overflow-auto pr-2 feed-scroll">
                  {itineraries.map((it) => (
                    <motion.div
                      key={it.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border rounded-xl p-4 flex gap-4 items-start"
                      style={{ borderColor: "#f3e9d0" }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{
                          background:
                            "linear-linear(135deg,#f6c93d 0%,#f3a200 100%)",
                        }}
                      >
                        {it.user[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex flex-col">
                            <div className="font-semibold">{it.user}</div>
                            <div className="mt-2 flex items-center gap-2">
                              <span
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                  background:
                                    "linear-linear(90deg,#ffd27a,#f3b000)",
                                  color: "#2b2b2b",
                                }}
                              >
                                <FiMapPin className="text-black/70" />
                                <span>{it.place || "Place not specified"}</span>
                              </span>
                              <span className="text-xs text-gray-500 ml-2">
                                {it.dates}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            needs:{" "}
                            <span
                              className="font-semibold"
                              style={{ color: "#b8860b" }}
                            >
                              {it.need}
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-gray-700">
                          {it.summary}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <button
                            className="px-3 py-1 rounded-md border text-sm"
                            style={{ borderColor: "#f0e6d2" }}
                          >
                            Message
                          </button>
                          <button className="px-3 py-1 rounded-md bg-linear-to-r from-yellow-400 to-yellow-300 text-white text-sm">
                            Offer Help
                          </button>
                          <button
                            className="px-3 py-1 rounded-md bg-white border text-sm"
                            style={{ borderColor: "#f0e6d2" }}
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <aside className="w-full lg:w-96 sticky top-20 self-start">
            <div
              className="bg-white rounded-xl p-4 flex items-center gap-4"
              style={{ borderColor: "#f3e9d0" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{
                  background: "linear-linear(135deg,#f6c93d 0%,#f3a200 100%)",
                }}
              >
                M
              </div>
              <div>
                <div className="font-semibold">Muskan</div>
                <div className="text-sm text-gray-500">musk</div>
              </div>
            </div>

            <div
              className="mt-4 bg-white rounded-xl p-4"
              style={{ borderColor: "#f3e9d0" }}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">Suggested for you</div>
                <div className="text-sm text-gray-500">See All</div>
              </div>
              <ul className="mt-3 space-y-3">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      M
                    </div>
                    <div className="text-sm">
                      Mansi{" "}
                      <span className="text-xs text-gray-400">
                        · Followed by ish ...
                      </span>
                    </div>
                  </div>
                  <button
                    className="text-sm font-medium"
                    style={{ color: "#b8860b" }}
                  >
                    Follow
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      T
                    </div>
                    <div className="text-sm">tuktuk</div>
                  </div>
                  <button
                    className="text-sm font-medium"
                    style={{ color: "#b8860b" }}
                  >
                    Follow
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

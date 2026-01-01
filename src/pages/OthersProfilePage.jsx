import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const GOLD = "#d4af37";

const EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🙏"]; // WhatsApp-like

function ReactionBar({ initialCounts = {}, onChange }) {
  const [userReaction, setUserReaction] = useState(null); // one reaction at a time
  const [counts, setCounts] = useState(() => {
    const base = {};
    EMOJIS.forEach((e) => (base[e] = initialCounts[e] || 0));
    return base;
  });

  const handleReact = (emoji) => {
    setCounts((prev) => {
      const next = { ...prev };
      if (userReaction === emoji) {
        // toggle off
        next[emoji] = Math.max(0, (next[emoji] || 0) - 1);
        setUserReaction(null);
      } else {
        // switch reactions
        if (userReaction) {
          next[userReaction] = Math.max(0, (next[userReaction] || 0) - 1);
        }
        next[emoji] = (next[emoji] || 0) + 1;
        setUserReaction(emoji);
      }
      onChange?.(next, userReaction === emoji ? null : emoji);
      return next;
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3 select-none">
      {EMOJIS.map((emoji) => {
        const active = userReaction === emoji;
        return (
          <button
            key={emoji}
            type="button"
            onClick={() => handleReact(emoji)}
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition shadow-sm hover:shadow ${
              active ? "scale-[1.03]" : ""
            }`}
            style={{
              borderColor: active ? GOLD : `${GOLD}66`,
              backgroundColor: active ? GOLD : "white",
              color: active ? "white" : GOLD,
            }}
            aria-pressed={active}
          >
            <span>{emoji}</span>
            <span className="tabular-nums">{counts[emoji] || 0}</span>
          </button>
        );
      })}
    </div>
  );
}

function PostCard({ post }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
      style={{ borderColor: `${GOLD}33` }}
    >
      {post.imageUrl ? (
        <div className="w-full aspect-video bg-gray-50 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title || "Post image"}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      <div className="p-4">
        {post.title ? (
          <h4 className="text-base font-semibold mb-1" style={{ color: GOLD }}>
            {post.title}
          </h4>
        ) : null}
        {post.content ? (
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        ) : null}
        <ReactionBar initialCounts={post.reactions} />
      </div>
    </motion.article>
  );
}

export default function ConnectPage({ user, posts }) {
  // Demo fallback content if no props are provided
  const fallbackUser = useMemo(
    () =>
      user || {
        name: "Aarav Mehta",
        address: "Bandra West, Mumbai, India",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
      },
    [user]
  );

  const fallbackposts = useMemo(
    () =>
      posts || [
        {
          id: "p1",
          title: "Sunrise at Kedarkantha",
          content:
            "Caught the first light kissing the peaks. The trail was peaceful and the air crisp—pure bliss!",
          imageUrl:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
          reactions: { "👍": 12, "❤️": 8, "😂": 0, "😮": 4, "😢": 0, "🙏": 2 },
        },
        {
          id: "p2",
          title: "Hidden café in Dehradun",
          content:
            "Stumbled upon a quaint café with the best masala chai. Added to the must-visit list!",
          imageUrl:
            "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=1600&auto=format&fit=crop",
          reactions: { "👍": 5, "❤️": 3, "😂": 1, "😮": 1, "😢": 0, "🙏": 0 },
        },
        {
          id: "p3",
          title: "Rishikesh river walk",
          content:
            "Evening stroll by the Ganga—soft breeze, temple bells, and friendly travelers everywhere.",
          imageUrl:
            "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop",
          reactions: { "👍": 9, "❤️": 6, "😂": 0, "😮": 2, "😢": 0, "🙏": 1 },
        },
      ],
    [posts]
  );

  return (
    <div className="min-h-screen bg-white mt-4">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-10 pt-10 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center italic text-2xl sm:text-3xl font-semibold leading-snug"
          style={{ color: GOLD }}
        >
          share your travel moments/stories & connect with new friends.
        </motion.h1>
      </section>

      {/* Profile Card */}
      <section className="px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-3 rounded-3xl bg-white border shadow-sm p-6 sm:p-8"
          style={{ borderColor: `${GOLD}33` }}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <img
                src={fallbackUser.avatar}
                alt={fallbackUser.name}
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full ring-2"
                style={{ ringColor: GOLD }}
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: GOLD }}>
                {fallbackUser.name}
              </h2>
              <p className="text-gray-600">{fallbackUser.address}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* posts */}
      <section className="px-4 sm:px-6 lg:px-10 mt-8 mb-12">
        <div className="mx-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg sm:text-3xl italic font-semibold" style={{ color: GOLD }}>
              posts
            </h3>
          </div>

          <div className="grid gap-6 sm:gap-7 md:grid-cols-4">
            {fallbackposts.map((post) => (
              <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </section>

      {/* Subtle bottom gradient accent */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 h-32 opacity-20"
        style={{
          background:
            "radial-gradient(80% 80% at 50% 100%, #d4af37 0%, rgba(212,175,55,0) 70%)",
        }}
      />
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import {
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiTrendingUp,
  FiMessageCircle,
  FiChevronDown,
  FiSmile,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { listItineraries } from "../../api/itineraries";
import { reactToPost } from "../../api/posts";
import { useAuth } from "../../context/AuthContext";
import PremiumSelect from "../PremiumSelect";
import RatingStars from "../RatingStars";
import { useNotifications } from "../../context/NotificationContext";

/* ---------------- helpers ---------------- */

const EMOJIS = ["🔥", "❤️", "👍", "😍", "😮", "👏"];

const LOOKING_FOR_MAP = [
  { key: "partner", label: "Partner" },
  { key: "group", label: "Group" },
  { key: "budget", label: "Budget companions" },
];

function getLookingFor(tags = []) {
  const t = tags.map((x) => x.toLowerCase());
  return LOOKING_FOR_MAP.filter((l) =>
    t.some((tag) => tag.includes(l.key))
  ).map((l) => l.label);
}

/* ---------------- component ---------------- */

const ConnectPlan = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [raised, setRaised] = useState({});
  const [expanded, setExpanded] = useState({});
  const [openPicker, setOpenPicker] = useState(null);

  /* filters */
  const [lookingFor, setLookingFor] = useState("all");
  const [sortBy, setSortBy] = useState("default"); // default | rating_desc | rating_asc
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const { addNotification } = useNotifications();

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await listItineraries();
        setPlans(res?.itineraries || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  async function react(planId, emoji) {
    if (!user) return alert("Please login to react");

    try {
      const res = await reactToPost(planId, emoji, {
        token: localStorage.getItem("auth_token"),
      });

      if (res.success) {
        setPlans((prev) =>
          prev.map((p) => {
            if (p._id === planId) {
              return { ...p, reactions: res.reactions };
            }
            return p;
          })
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to react");
    }
    setOpenPicker(null);
  }

  function getCounts(plan) {
    const counts = {};
    if (plan.reactions) {
      plan.reactions.forEach((r) => {
        counts[r.emoji] = (counts[r.emoji] || 0) + 1;
      });
    }
    return counts;
  }

  function getMyReaction(plan) {
    if (!user || !plan.reactions) return null;
    const r = plan.reactions.find(
      (react) => react.user === user._id || react.user?._id === user._id
    );
    return r ? r.emoji : null;
  }

  function toggleRaise(id) {
    setRaised((r) => ({
      ...r,
      [id]: (r[id] || 0) + 1,
    }));
  }

  function toggleExpand(id) {
    setExpanded((e) => ({ ...e, [id]: !e[id] }));
  }

  function handleMessage(plan) {
    alert(`Messaging ${plan.user?.firstname}`);
  }

  /* ---------------- FILTER + SORT ---------------- */

  const visiblePlans = useMemo(() => {
    let list = plans.filter((p) => {
      // Looking for filter
      if (lookingFor !== "all") {
        const lf = getLookingFor(p.tags || []);
        if (
          lookingFor !== "all" &&
          !lf.some((x) => x.toLowerCase().includes(lookingFor))
        ) {
          return false;
        }
      }

      // Top rated filter
      if (topRatedOnly) {
        const avg = p.rating?.average || 0;
        const count = p.rating?.count || 0;
        if (!(avg >= 4.5 && count >= 3)) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === "rating_desc") {
      list = [...list].sort(
        (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)
      );
    }

    if (sortBy === "rating_asc") {
      list = [...list].sort(
        (a, b) => (a.rating?.average || 0) - (b.rating?.average || 0)
      );
    }

    return list;
  }, [plans, lookingFor, sortBy, topRatedOnly]);

  if (loading) {
    return (
      <div className="space-y-10">
        {[1, 2].map((i) => (
          <div key={i} className="h-56 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* ---------------- FILTER BAR ---------------- */}
      <div className="flex flex-wrap gap-4 items-end">
        <PremiumSelect
          label="Looking for"
          value={lookingFor}
          onChange={setLookingFor}
          options={[
            { label: "Anyone", value: "all" },
            { label: "Partner", value: "partner" },
            { label: "Group", value: "group" },
            { label: "Budget companions", value: "budget" },
          ]}
        />

        <PremiumSelect
          label="Sort by"
          value={sortBy}
          onChange={setSortBy}
          options={[
            { label: "Default", value: "default" },
            { label: "Highest rated", value: "rating_desc" },
            { label: "Lowest rated", value: "rating_asc" },
          ]}
        />

        <div
          onClick={() => setTopRatedOnly(!topRatedOnly)}
          className="flex items-center gap-3 cursor-pointer select-none pb-1"
        >
          <div
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${topRatedOnly ? "bg-[#C59A2F] justify-end" : "bg-gray-300 justify-start"
              }`}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-4 h-4 bg-white rounded-full shadow-sm"
            />
          </div>
          <span
            className={`text-sm font-medium transition-colors ${topRatedOnly ? "text-[#C59A2F]" : "text-gray-600"
              }`}
          >
            Top rated only
          </span>
        </div>
      </div>

      {/* ---------------- PLANS ---------------- */}
      {visiblePlans.map((plan) => {
        const user = plan.user || {};
        const location = plan.location || {};
        const duration = plan.duration || {};
        const price = plan.price || {};
        const capacity = plan.capacity || {};
        const looking = getLookingFor(plan.tags || []);
        const isExpanded = expanded[plan._id];

        const isTopRated =
          (plan.rating?.average || 0) >= 4.5 && (plan.rating?.count || 0) >= 3;

        return (
          <motion.article
            key={plan._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-12 border-b border-gray-200"
          >
            {/* AUTHOR */}
            <div className="flex items-center gap-3 mb-3 text-left">
              <div className="w-10 h-10 rounded-full bg-[#C59A2F] text-white flex items-center justify-center font-bold overflow-hidden uppercase">
                {(user.avatar?.url || (typeof user.avatar === 'string' ? user.avatar : null)) ? (
                  <img src={user.avatar?.url || user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <>
                    {user.firstname?.[0] || ""}
                    {user.lastname?.[0] || (!user.firstname ? "U" : "")}
                  </>
                )}
              </div>

              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-900">
                  {user.firstname} {user.lastname}
                </span>
                <span className="text-xs text-gray-600">Host</span>
              </div>

              {isTopRated && (
                <span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  ⭐ Top Rated
                </span>
              )}
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-gray-900 leading-snug text-left">
              {plan.title}
            </h2>

            {/* RATING */}
            <div className="mt-2">
              <RatingStars
                average={plan.rating?.average || 0}
                count={plan.rating?.count || 0}
              />
            </div>

            {/* META */}
            <div className="mt-3 flex flex-wrap gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FiMapPin /> {location.city}, {location.state}
              </span>

              <span className="flex items-center gap-1">
                <FiCalendar />
                {duration.days} day{duration.days > 1 ? "s" : ""}
                {duration.nights
                  ? ` · ${duration.nights} night${duration.nights > 1 ? "s" : ""
                  }`
                  : ""}
              </span>

              <span className="flex items-center gap-1">
                <FiUsers /> {capacity.maxPeople} people
              </span>

              <span className="font-medium text-gray-900">
                ₹{price.perPerson}
                <span className="text-xs text-gray-500"> / {price.period}</span>
              </span>
            </div>

            {/* LOOKING FOR */}
            {looking.length > 0 && (
              <div className="mt-4 text-sm">
                <span className="text-gray-500">Looking for: </span>
                <span className="font-medium text-gray-900">
                  {looking.join(", ")}
                </span>
              </div>
            )}

            {/* DESCRIPTION */}
            <div className="mt-4 text-[15px] text-gray-700 leading-relaxed text-justify">
              <p className={isExpanded ? "" : "line-clamp-3"}>
                {plan.description}
              </p>

              {plan.description?.length > 160 && (
                <button
                  onClick={() => toggleExpand(plan._id)}
                  className="mt-1 flex items-center gap-1 text-sm text-[#C59A2F] hover:underline"
                >
                  {isExpanded ? "Show less" : "Read more"}
                  <FiChevronDown
                    className={`transition-transform ${isExpanded ? "rotate-180" : ""
                      }`}
                  />
                </button>
              )}
            </div>

            {/* CATEGORIES */}
            {plan.categories?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {plan.categories.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-3 py-1 rounded-full border border-[#C59A2F]/40 text-[#C59A2F]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}

            {/* FOOTER */}
            <div className="relative mt-6 flex items-center gap-4">
              <div className="flex gap-2">
                {Object.entries(getCounts(plan)).map(([emoji, count]) => (
                  <span key={emoji} className="bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100 text-xs flex items-center gap-1">
                    <span>{emoji}</span>
                    <span className="font-semibold text-gray-700">{count}</span>
                  </span>
                ))}
              </div>

              <button
                onClick={() =>
                  setOpenPicker(openPicker === plan._id ? null : plan._id)
                }
                className={`flex cursor-pointer items-center gap-2 text-sm transition ${getMyReaction(plan) ? "text-yellow-600 font-medium" : "text-gray-600 hover:text-black"
                  }`}
              >
                {getMyReaction(plan) ? (
                  <span className="text-lg leading-none">
                    {getMyReaction(plan)}
                  </span>
                ) : (
                  <FiSmile />
                )}
                {getMyReaction(plan) ? "Reacted" : "React"}
              </button>

              <AnimatePresence>
                {openPicker === plan._id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-12 left-0 bg-white border border-gray-300 rounded-xl shadow-lg px-3 py-2 flex gap-2 z-20"
                  >
                    {EMOJIS.map((e) => (
                      <button
                        key={e}
                        onClick={() => react(plan._id, e)}
                        className="text-xl hover:scale-125 transition"
                      >
                        {e}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                className="flex cursor-pointer items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                onClick={() => handleMessage(plan)}
              >
                <FiMessageCircle />
                Message
              </button>

              <button className="ml-auto cursor-pointer px-5 py-2 rounded-full bg-[#C59A2F] text-white text-sm font-medium hover:opacity-90">
                Join this plan
              </button>
            </div>
          </motion.article>
        );
      })}

      {visiblePlans.length === 0 && (
        <div className="text-center text-gray-500 py-12 text-sm">
          No plans match your filters
        </div>
      )}
    </div>
  );
};

export default ConnectPlan;

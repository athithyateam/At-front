import React, { useEffect, useMemo, useState } from "react";
import {
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiTrendingUp,
  FiMessageCircle,
  FiChevronDown,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { listItineraries } from "../../api/itineraries";
import PremiumSelect from "../PremiumSelect";
import RatingStars from "../RatingStars";

/* ---------------- helpers ---------------- */

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

function handleMessage(plan) {
  alert(`Messaging ${plan.user?.firstname}`);
}

/* ---------------- component ---------------- */

const ConnectPlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [raised, setRaised] = useState({});
  const [expanded, setExpanded] = useState({});

  /* filters */
  const [lookingFor, setLookingFor] = useState("all");
  const [sortBy, setSortBy] = useState("default"); // default | rating_desc | rating_asc
  const [topRatedOnly, setTopRatedOnly] = useState(false);

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

  function toggleRaise(id) {
    setRaised((r) => ({
      ...r,
      [id]: (r[id] || 0) + 1,
    }));
  }

  function toggleExpand(id) {
    setExpanded((e) => ({ ...e, [id]: !e[id] }));
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

        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={topRatedOnly}
            onChange={(e) => setTopRatedOnly(e.target.checked)}
          />
          Top rated only
        </label>
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
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#C59A2F] text-white flex items-center justify-center font-bold">
                {user.firstname?.[0] || "U"}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  {user.firstname} {user.lastname}
                </span>
                <span className="text-xs text-gray-500">Host</span>
              </div>

              {isTopRated && (
                <span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  ⭐ Top Rated
                </span>
              )}
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-gray-900 leading-snug">
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
                  ? ` · ${duration.nights} night${
                      duration.nights > 1 ? "s" : ""
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
            <div className="mt-4 text-[15px] text-gray-700 leading-relaxed">
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
                    className={`transition-transform ${
                      isExpanded ? "rotate-180" : ""
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
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => toggleRaise(plan._id)}
                className="flex cursor-pointer items-center gap-1 text-sm text-gray-600 hover:text-[#C59A2F]"
              >
                <FiTrendingUp />
                Raise {raised[plan._id] || 0}
              </button>

              <button className="flex cursor-pointer items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              onClick={()=> handleMessage(plan)}>
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

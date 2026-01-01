import React, { useEffect, useState } from "react";
import FeaturedTrekCard from "../cards/FeaturedTrekCard";
import { getFeaturedTreks } from "../../api/explore";

const FeaturedTreks = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTreks() {
      try {
        const res = await getFeaturedTreks(10);
        setTreks(res?.posts || []);
      } catch (err) {
        console.error("Failed to load featured treks", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTreks();
  }, []);

  if (loading) {
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-72 h-80 bg-gray-100 rounded-xl animate-pulse"
          />
        ))}
      </>
    );
  }

  return (
    <>
      {treks.map((trek) => (
        <FeaturedTrekCard
          key={trek._id}
          image={trek.photos?.[0]?.url || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/330px-Placeholder_view_vector.svg.png"}
          title={trek.title}
          days={`${trek.duration.days}D • ${trek.duration.nights}N`}
          level={trek.difficulty}
          price={`₹${trek.price.perPerson.toLocaleString()}`}
          location={`${trek.location.city}, ${trek.location.state}`}
        />
      ))}
    </>
  );
};

export default FeaturedTreks;

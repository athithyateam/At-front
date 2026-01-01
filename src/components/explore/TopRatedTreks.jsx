import React, { useEffect, useState } from "react";
import { getTopRatedTreks } from "../../api/explore";
import FeaturedTrekCard from "../cards/FeaturedTrekCard";

const TopRatedTreks = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTreks() {
      try {
        const res = await getTopRatedTreks();
        setTreks(res?.treks || []);
      } catch (err) {
        console.error("Top rated treks error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTreks();
  }, []);

  if (loading) {
    return <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />;
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
          price={`₹${trek.price.perPerson}`}
          location={`${trek.location.city}, ${trek.location.state}`}
          rating={trek.averageRating}
        />
      ))}
    </>
  );
};

export default TopRatedTreks;

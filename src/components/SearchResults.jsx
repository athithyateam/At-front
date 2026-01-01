import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FeaturedTrekCard from "../components/cards/FeaturedTrekCard";
import { axiosInstance } from "../api/posts";
import { ENDPOINTS } from "../api/allApi";

const SearchResults = () => {
  const [params] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = params.get("location");
  const from = params.get("from");
  const to = params.get("to");

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await axiosInstance.get(ENDPOINTS.POSTS, {
          params: { location, from, to },
        });

        setResults(res?.data?.posts || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [location, from, to]);

  if (loading) return <div>Loading results...</div>;

  return (
    <div className="grid gap-6 px-4 py-6">
      {results.map((trek) => (
        <FeaturedTrekCard
          key={trek._id}
          image={trek.photos?.[0]?.url}
          title={trek.title}
          days={`${trek.duration.days}D • ${trek.duration.nights}N`}
          level={trek.difficulty}
          price={`₹${trek.price.perPerson}`}
          location={`${trek.location.city}, ${trek.location.state}`}
        />
      ))}
    </div>
  );
};

export default SearchResults;

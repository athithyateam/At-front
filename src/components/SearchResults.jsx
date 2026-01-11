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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {location ? (
              <>
                Search Results for <span className="text-[#d4af37]">"{location}"</span>
              </>
            ) : (
              "All Experiences"
            )}
          </h1>
          <p className="text-gray-600">
            {results.length} {results.length === 1 ? "experience" : "experiences"} found
          </p>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
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
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-white p-8 rounded-full shadow-lg mb-6">
              <svg
                className="w-16 h-16 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No experiences found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any experiences matching "{location}". Try searching for a different location or browse our popular destinations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

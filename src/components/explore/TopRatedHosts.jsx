import React, { useEffect, useState } from "react";
import { getTopRatedHosts } from "../../api/explore";
import HostCard from "../cards/HostCard";

const TopRatedHosts = () => {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHosts() {
      try {
        const res = await getTopRatedHosts();
        setHosts(res?.hosts || []);
      } catch (err) {
        console.error("Top rated hosts error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHosts();
  }, []);

  if (loading) {
    return <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />;
  }

  return (
    <>
      {hosts.map((host) => (
        <HostCard
          key={host._id}
          image={(typeof host.avatar === 'string' ? host.avatar : host.avatar?.url) || ""}
          name={`${host.firstname} ${host.lastname}`}
          role="Verified Host"
          location="India"
          tripsHosted={host.totalPosts}
          rating={host.averageRating}
        />
      ))}
    </>
  );
};

export default TopRatedHosts;

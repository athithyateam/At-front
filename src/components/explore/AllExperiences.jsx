import React, { useEffect, useState } from "react";
import * as ServicesAPI from "../../api/services";
import FeaturedTrekCard from "../cards/FeaturedTrekCard";

const AllExperiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExperiences() {
            try {
                // Use the dedicated listServices helper
                const data = await ServicesAPI.listServices();
                console.log("AllExperiences - API Response:", data);

                // Be very flexible with the key names returned by the API
                const items = data?.services || data?.posts || data?.experiences || data?.data || [];
                console.log("AllExperiences - Found items:", items);

                setExperiences(items);
            } catch (err) {
                console.error("Failed to load all experiences", err);
            } finally {
                setLoading(false);
            }
        }
        fetchExperiences();
    }, []);

    if (loading) {
        return (
            <>
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-72 h-80 bg-gray-100 rounded-xl animate-pulse shrink-0"
                    />
                ))}
            </>
        );
    }

    if (experiences.length === 0) {
        return (
            <div className="w-full text-center py-10 text-gray-400">
                No experiences found. Add your first experience from the Host Dashboard!
            </div>
        );
    }

    return (
        <>
            {experiences.map((exp) => {
                const hostName = exp.user ? `${exp.user.firstname || ""} ${exp.user.lastname || ""}` : "Verified Host";
                return (
                    <div key={exp._id} className="relative group shrink-0">
                        <FeaturedTrekCard
                            image={exp.photos?.[0]?.url || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/330px-Placeholder_view_vector.svg.png"}
                            title={exp.title}
                            days={exp.duration?.days ? `${exp.duration.days}D • ${exp.duration.nights || 0}N` : "1 Day"}
                            level={exp.difficulty || exp.level || "Moderate"}
                            price={`₹${(exp.price?.amount || exp.price?.perPerson || 0).toLocaleString()}`}
                            location={`${exp.location?.city || "Unknown"}, ${exp.location?.state || ""}`}
                        />
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-white font-medium whitespace-nowrap shadow-lg">
                                Host: {hostName}
                            </span>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default AllExperiences;

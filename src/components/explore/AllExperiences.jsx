import React, { useEffect, useState } from "react";
import * as ServicesAPI from "../../api/services";
import FeaturedTrekCard from "../cards/FeaturedTrekCard";

const AllExperiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExperiences() {
            try {
                // Use the dedicated listServices helper which uses the axiosInstance
                const data = await ServicesAPI.listServices();

                // Be very flexible with the key names returned by the API
                const items = data?.services || data?.posts || data?.experiences || data?.data || [];
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
                No experiences found
            </div>
        );
    }

    return (
        <>
            {experiences.map((exp) => (
                <FeaturedTrekCard
                    key={exp._id}
                    image={exp.photos?.[0]?.url || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/330px-Placeholder_view_vector.svg.png"}
                    title={exp.title}
                    days={exp.duration?.days ? `${exp.duration.days}D • ${exp.duration.nights || 0}N` : "1 Day"}
                    level={exp.difficulty || exp.level || "Moderate"}
                    price={`₹${exp.price?.amount?.toLocaleString() || exp.price?.perPerson?.toLocaleString() || "0"}`}
                    location={`${exp.location?.city || "Unknown"}, ${exp.location?.state || ""}`}
                />
            ))}
        </>
    );
};

export default AllExperiences;

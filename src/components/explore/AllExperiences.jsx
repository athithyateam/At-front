import React, { useEffect, useState } from "react";
import axios from "axios";
import FeaturedTrekCard from "../cards/FeaturedTrekCard";
import { ENDPOINTS } from "../../api/allApi";

const AllExperiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExperiences() {
            try {
                const res = await axios.get(ENDPOINTS.ALL_SERVICES);
                setExperiences(res.data?.experiences || res.data?.services || []);
            } catch (err) {
                console.error("Failed to load experiences", err);
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
                        className="w-72 h-80 bg-gray-100 rounded-xl animate-pulse"
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
                    days={`${exp.duration?.days || 1}D • ${exp.duration?.nights || 0}N`}
                    level={exp.difficulty || "Moderate"}
                    price={`₹${exp.price?.amount?.toLocaleString() || exp.price?.perPerson?.toLocaleString() || "0"}`}
                    location={`${exp.location?.city || "Unknown"}, ${exp.location?.state || ""}`}
                />
            ))}
        </>
    );
};

export default AllExperiences;

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ConnectPost from "./ConnectPost";
import ConnectPlan from "./ConnectPlan";

import { ENDPOINTS } from "../../api/allApi";

const Connect = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabs = [
    { key: "services", label: "Experience" },
    { key: "posts", label: "Momentos" },
    { key: "plans", label: "Plans" },
  ].filter(tab => {
    if (tab.key === 'services' && user?.role !== 'host') return false;
    return true;
  });

  const activeTab = searchParams.get("tab") || tabs[0]?.key || "posts";

  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 64); // navbar height
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white mt-16">
      {/* CONNECT TABS */}
      <div
        className={`sticky top-0 z-20 bg-white transition-colors ${scrolled
          ? "border-b border-[#C59A2F]"
          : "border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-10 justify-center my-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative cursor-pointer py-3 text-lg font-semibold tracking-wide transition-colors ${isActive
                    ? "text-[#C59A2F]"
                    : "text-gray-500 hover:text-gray-800"
                    }`}
                >
                  {tab.label}

                  {/* Gold underline */}
                  <span
                    className={`absolute left-0 bottom-1 h-0.5 w-full bg-[#C59A2F] rounded-full transition-transform duration-300 origin-center ${isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === "posts" && <ConnectPost endpoint={ENDPOINTS.POSTS} />}
        {activeTab === "plans" && <ConnectPlan />}
        {activeTab === "services" && <ConnectPost endpoint={ENDPOINTS.ALL_SERVICES} />}
      </div>
    </div>
  );
};

export default Connect;

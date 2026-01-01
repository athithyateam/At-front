import React, { useEffect, useState } from "react";
import ConnectPost from "./ConnectPost";
import ConnectPlan from "./ConnectPlan";

const tabs = [
  { key: "posts", label: "Momentos" },
  { key: "plans", label: "Plans" },
];

const Connect = () => {
  const [activeTab, setActiveTab] = useState("posts");
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
        className={`sticky top-16 z-20 bg-white transition-colors ${
          scrolled
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
                  className={`relative cursor-pointer py-3 text-lg font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "text-[#C59A2F]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}

                  {/* Gold underline */}
                  <span
                    className={`absolute left-0 bottom-1 h-0.5 w-full bg-[#C59A2F] rounded-full transition-transform duration-300 origin-center ${
                      isActive ? "scale-x-100" : "scale-x-0"
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
        {activeTab === "posts" && <ConnectPost />}
        {activeTab === "plans" && <ConnectPlan />}
      </div>
    </div>
  );
};

export default Connect;

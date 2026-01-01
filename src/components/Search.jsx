import React, { useState } from "react";
import { FiMapPin, FiCalendar, FiSearch, FiX } from "react-icons/fi";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";
import { updateUserLocationApi } from "../api/profileApi";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [showCalendar, setShowCalendar] = useState(false);

  // Ensure "today" is midnight in local time to avoid timezone drift
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get user's current location as "Locality, City"
  const handleUseCurrentLocation = async () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const addr = data?.address || {};

          const locality =
            addr.suburb ||
            addr.neighbourhood ||
            addr.hamlet ||
            addr.locality ||
            addr.road ||
            addr.village;
          const city =
            addr.city || addr.town || addr.village || addr.county || addr.state;
          const state = addr.state || "";
          const country = addr.country || "";

          const parts = [];
          if (locality) parts.push(locality);
          if (city && !parts.includes(city)) parts.push(city);

          const shortName =
            parts.join(", ") ||
            data?.display_name ||
            `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;

          setLocation(shortName);

          // Save coordinates to backend if user is logged in with valid token
          const token = localStorage.getItem("auth_token");
          if (token && token !== "null" && token !== "undefined") {
            try {
              await updateUserLocationApi({
                latitude,
                longitude,
                address: data?.display_name || "",
                city: city || "",
                state: state,
                country: country
              });
              console.log("Location saved to backend");
            } catch (error) {
              // Silently handle auth errors - user might not be logged in or token expired
              if (error?.response?.status === 401) {
                // Clear invalid token
                localStorage.removeItem("auth_token");
              } else {
                console.error("Error saving location:", error);
              }
            }
          }
        } catch (err) {
          console.error(err);
          alert("Could not fetch location name.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        let errorMessage = "Unable to get your location.";
        
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please allow location permissions in your browser.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        alert(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 60000,          // 60 seconds
        maximumAge: 600000       // 10 minutes cache
      }
    );
  };

  // 🗓 Format date range nicely
  const formatRange = () => {
    if (!range.from) return "When";
    if (!range.to)
      return range.from.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
      });
    return `${range.from.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
    })} - ${range.to.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
    })}`;
  };

  const handleClearDate = () => {
    setRange({ from: undefined, to: undefined });
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);

    if (range?.from) params.set("from", range.from.toISOString().split("T")[0]);

    if (range?.to) params.set("to", range.to.toISOString().split("T")[0]);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="relative">
      {/* Search Bar */}
      <div
        className="flex flex-col md:flex-row bg-white/95 rounded-3xl shadow-xl p-3 md:p-1 gap-2 relative z-20"
        style={{ overflow: "visible" }}
      >
        {/* WHERE TO */}
        <div className="relative flex items-center flex-1 px-3">
          <FiMapPin className="text-gray-500 mr-2 w-12" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where to?"
            className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="ml-2 text-sm GOLD hover:underline whitespace-nowrap"
          >
            {loading ? "Detecting..." : "Use current location"}
          </button>
        </div>

        <div className="hidden md:block w-px bg-gray-300" />

        {/* WHEN */}
        <div className="relative flex items-center flex-1 px-3">
          <FiCalendar className="text-gray-500 mr-2" />
          <button
            onClick={() => setShowCalendar((s) => !s)}
            className="w-full text-left text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
          >
            {formatRange()}
          </button>

          {/* Clear date button (visible only when dates selected) */}
          {range.from && (
            <button
              onClick={handleClearDate}
              className="absolute right-2 text-gray-500 hover:text-gray-700 transition"
              aria-label="Clear date"
            >
              <FiX />
            </button>
          )}

          {/* Calendar popover */}
          {showCalendar && (
            <div
              className="absolute top-14 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 z-50 bg-white rounded-2xl shadow-xl p-4"
              style={{ zIndex: 9999 }}
            >
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={1}
                fromDate={today} // prevents past-day selection
                disabled={{ before: today }} // blocks clicking old dates
                footer={
                  range?.from && range?.to ? (
                    <div className="text-center text-sm text-gray-500">
                      {formatRange()}
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-400">
                      Select your dates
                    </div>
                  )
                }
              />
            </div>
          )}
        </div>

        {/* SEARCH */}
        <button
          onClick={handleSearch}
          className="bg-[#d4af37] hover:bg-[#C59A2F] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition font-semibold cursor-pointer"
        >
          <FiSearch />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

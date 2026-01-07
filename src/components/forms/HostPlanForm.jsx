import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { FiChevronDown, FiX } from "react-icons/fi";
import { createItinerary, getItinerary, updateItinerary } from "../../api/itineraries";
import { useAuth } from "../../context/AuthContext";

/* ----------------------- visual constants ----------------------- */
const GOLD = "#C59D5F";
const SOFT_BORDER_CLASS = "border-gray-100";
const CARD_BG_CLASS = "bg-white";
const INPUT_STYLE = { borderColor: "#F0F0F0", background: "#FAFBFB" };
const SMALL_BORDER_STYLE = { border: "1px solid #F6F6F6" };

function MetricInput({ label, hint, value, onChange }) {
  return (
    <div>
      {/* Label OUTSIDE */}
      <label className="text-xs text-gray-500 block mb-1">{label}</label>

      {/* Value Card */}
      <div className="bg-[#fffdf8] rounded-xl p-3 soft-border">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-lg focus:outline-none"
        />
      </div>

      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function AnimatedMetricSelect({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      {" "}
      <label className="text-xs text-gray-500 block mb-1">{label}</label>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="bg-[#fffdf8] rounded-xl p-3 soft-border cursor-pointer flex justify-between items-center w-full"
      >
        <span className="text-sm font-medium text-gray-700">{value}</span>
        <FiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 z-50
                       bg-white rounded-xl soft-border soft-shadow"
          >
            {options.map((o) => (
              <div
                key={o}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#fbf6ea]
                  ${o === value ? "text-[#C59D5F] font-medium" : "text-gray-600"
                  }`}
              >
                {o}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------- small presentational comps ----------------------- */
function Section({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 soft-border soft-shadow space-y-4 overflow-visible">
      <div>
        <h4 className="text-sm font-semibold tracking-wide GOLD">{title}</h4>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      {label && (
        <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      )}
      <input
        {...props}
        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-40 focus:ring-indigo-100"
        style={INPUT_STYLE}
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      {label && (
        <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      )}
      <textarea
        {...props}
        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-40 focus:ring-indigo-100"
        style={INPUT_STYLE}
      />
    </div>
  );
}

/* ----------------------- small local component: InlineAdder -----------------------
   Keeps typing state local so parent won't re-render on every keystroke.
   Use for Tags and Amenities.
------------------------------------------------------------------------- */
function InlineAdder({ placeholder = "", addLabel = "Add", onAdd }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function handleAdd() {
    const v = value.trim();
    if (!v) return;
    onAdd(v);
    setValue("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center w-full">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="rounded-lg border px-3 py-2 text-sm flex-1 min-w-[120px]"
        style={INPUT_STYLE}
        autoComplete="off"
        aria-label={placeholder}
      />
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()} // prevents blur when clicking
        onClick={handleAdd}
        className="px-4 py-2 rounded-lg border text-sm GOLD-bg text-white font-medium whitespace-nowrap active:scale-95 transition"
        style={{ borderColor: "#C59D5F" }}
      >
        {addLabel}
      </button>
    </div>
  );
}

/* ----------------------- small helper ----------------------- */
function validateDateRange(range) {
  if (!range?.start || !range?.end) return false;
  return new Date(range.start) <= new Date(range.end);
}

/* ----------------------- MAIN Component ----------------------- */

export default function HostPlanForm({ editId, onSaved }) {
  const { user } = useAuth();
  // core text fields
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [longDesc, setLongDesc] = useState("");

  // structured fields
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("Uttarakhand");
  const [country, setCountry] = useState("India");

  const [days, setDays] = useState(1);
  const [nights, setNights] = useState(0);

  const [pricePerPerson, setPricePerPerson] = useState("");
  const [capacity, setCapacity] = useState(4);

  // tags & amenities
  const [tags, setTags] = useState([]);
  const [amenities, setAmenities] = useState([]);

  // availability ranges
  const [availability, setAvailability] = useState([]);

  // media
  const [media, setMedia] = useState([]); // new files {file, preview, type}
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);

  // ui
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

  // Fetch data if editing
  useEffect(() => {
    if (editId) {
      const fetchData = async () => {
        try {
          const res = await getItinerary(editId);
          if (res.success) {
            const i = res.itinerary || res.post;
            setTitle(i.title || "");
            setSubtitle(i.subtitle || "");
            setLongDesc(i.description || "");
            setCity(i.location?.city || "");
            setStateField(i.location?.state || "Uttarakhand");
            setCountry(i.location?.country || "India");
            setDays(i.duration?.days || 1);
            setNights(i.duration?.nights || 0);
            setPricePerPerson(i.price?.perPerson || "");
            setCapacity(i.capacity?.maxPeople || 4);
            setTags(i.tags || []);
            setAmenities(i.amenities || []);
            setExistingPhotos(i.photos || []);
            setExistingVideos(i.videos || []);
            if (i.availability?.ranges) {
              setAvailability(i.availability.ranges.map((r, idx) => ({ ...r, id: idx })));
            }
          }
        } catch (err) {
          console.error("Fetch itinerary error:", err);
          alert("Failed to load itinerary data");
        }
      };
      fetchData();
    } else if (user?.firstname && !title) {
      // Set default dynamic title if not editing
      setTitle(`${user.firstname}'s invitation`);
    }
  }, [editId, user?.firstname]);

  /* ----------------------- Dropzone ----------------------- */
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const mapped = acceptedFiles.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      type: f.type.startsWith("video") ? "video" : "image",
    }));
    setMedia((prev) => [...prev, ...mapped]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    multiple: true,
  });

  useEffect(() => {
    return () => {
      media.forEach((m) => m.preview && URL.revokeObjectURL(m.preview));
    };
  }, [media]);

  /* ----------------------- simple helpers ----------------------- */
  function addAvailability() {
    setAvailability((a) => [
      ...a,
      { id: Date.now(), start: "", end: "", notes: "" },
    ]);
  }
  function updateAvailability(id, patch) {
    setAvailability((a) =>
      a.map((x) => (x.id === id ? { ...x, ...patch } : x))
    );
  }
  function removeAvailability(id) {
    setAvailability((a) => a.filter((x) => x.id !== id));
  }

  function removeMedia(idx) {
    setMedia((prev) => {
      const m = prev[idx];
      if (m?.preview) URL.revokeObjectURL(m.preview);
      return prev.filter((_, i) => i !== idx);
    });
  }

  function removeExistingPhoto(idx) {
    setExistingPhotos(prev => prev.filter((_, i) => i !== idx));
  }
  function removeExistingVideo(idx) {
    setExistingVideos(prev => prev.filter((_, i) => i !== idx));
  }

  function addTag(v) {
    if (!v) return;
    setTags((t) => (t.includes(v) ? t : [...t, v]));
  }
  function removeTag(t) {
    setTags((arr) => arr.filter((x) => x !== t));
  }
  function addAmenity(v) {
    if (!v) return;
    setAmenities((a) => (a.includes(v) ? a : [...a, v]));
  }
  function removeAmenity(a) {
    setAmenities((arr) => arr.filter((x) => x !== a));
  }

  function hasValidMinimal() {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    for (const r of availability) {
      if (!validateDateRange(r)) {
        e.availability = "One or more date ranges are invalid";
        break;
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function buildFormData() {
    const fd = new FormData();
    fd.append("userRole", "host");
    fd.append("postType", "plan");
    fd.append("title", title);
    fd.append("subtitle", subtitle);
    fd.append("description", longDesc);

    const locationObj = {
      city: city || "",
      state: stateField || "",
      country: country || "",
    };
    const durationObj = {
      days: Number(days || 0),
      nights: Number(nights || 0),
    };
    const priceObj = {
      perPerson: Number(pricePerPerson || 0),
      period: "person",
    };
    const capacityObj = { maxPeople: Number(capacity || 1) };

    fd.append("location", JSON.stringify(locationObj));
    fd.append("duration", JSON.stringify(durationObj));
    fd.append("price", JSON.stringify(priceObj));
    fd.append("capacity", JSON.stringify(capacityObj));
    fd.append("isFeatured", JSON.stringify(false));
    fd.append("status", "active");

    fd.append("tags", JSON.stringify(tags));
    fd.append("amenities", JSON.stringify(amenities));
    fd.append(
      "availability",
      JSON.stringify({
        isAvailable: availability.length > 0,
        ranges: availability.map(({ start, end, notes }) => ({
          start,
          end,
          notes,
        })),
      })
    );

    // New Media
    media
      .filter((m) => m.type === "image")
      .forEach((m) => fd.append("photos", m.file));
    media
      .filter((m) => m.type === "video")
      .forEach((m) => fd.append("videos", m.file));

    // Existing Media
    fd.append("existingPhotos", JSON.stringify(existingPhotos));
    fd.append("existingVideos", JSON.stringify(existingVideos));

    return fd;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!hasValidMinimal()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const fd = buildFormData();
      const token = window.localStorage.getItem("auth_token");

      let data;
      if (editId) {
        data = await updateItinerary(editId, fd, {
          token,
          onUploadProgress: (p) => setProgress(p),
        });
      } else {
        data = await createItinerary(fd, {
          onUploadProgress: (p) => setProgress(p),
          token,
        });
      }

      if (data?.success) {
        setProgress(100);
        if (!editId) {
          // reset only on create
          setTitle("");
          setSubtitle("");
          setLongDesc("");
          setAvailability([]);
          media.forEach((m) => m.preview && URL.revokeObjectURL(m.preview));
          setMedia([]);
          setTags([]);
          setAmenities([]);
          setCity("");
          setStateField("Uttarakhand");
          setCountry("India");
          setPricePerPerson("");
          setCapacity(4);
          setExistingPhotos([]);
          setExistingVideos([]);
        }

        if (typeof onSaved === "function") onSaved(data.post || data.itinerary);
        alert(editId ? "Listing updated successfully" : "Listing saved successfully");
      } else {
        console.warn("Unexpected response", data);
        alert("Action completed but unexpected response — check console");
      }
    } catch (err) {
      console.error("Action failed", err?.response ?? err);
      alert("Failed to save listing — " + (err.message || "check console"));
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 700);
    }
  }

  /* ----------------------- render ----------------------- */
  /* ----------------------- render ----------------------- */
  return (
    <div className="w-full px-4 lg:px-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-2 space-y-5">
            {/* MAIN DETAILS */}
            <Section title="Main details">
              <div className="grid grid-cols-1 gap-3">
                <Input
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={user?.firstname ? `${user.firstname}'s invitation` : "Your invitation"}
                />
                <Input
                  label="Subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Kedarnath"
                />
              </div>

              <div className="mt-3 relative">
                <Textarea
                  label="Full description"
                  value={longDesc}
                  onChange={(e) => setLongDesc(e.target.value.slice(0, 250))}
                  rows={4}
                  placeholder="Meeting point, inclusions, what to bring..."
                />
                <div className="text-[10px] text-right text-gray-400 mt-1">
                  {longDesc.length}/250 characters
                </div>
              </div>
            </Section>

            {/* LOCATION + QUICK FACTS */}
            <Section title="Location & Quick facts">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Sankri"
                />
                <Input
                  label="State"
                  value={stateField}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                />
                <Input
                  label="Country"
                  value={country}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <MetricInput
                  label="Days"
                  hint="Trip days"
                  value={days}
                  onChange={setDays}
                />
                <MetricInput
                  label="Nights"
                  hint="Overnight"
                  value={nights}
                  onChange={setNights}
                />
                <MetricInput
                  label="Capacity"
                  hint="Max people"
                  value={capacity}
                  onChange={setCapacity}
                />
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Price / person
                  </label>
                  <div className="bg-[#fffdf8] rounded-xl p-3 soft-border flex-1 flex items-center">
                    <input
                      type="number"
                      value={pricePerPerson}
                      onChange={(e) => setPricePerPerson(e.target.value)}
                      className="w-full bg-transparent text-lg focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">Cost per head</p>
                </div>
              </div>
            </Section>

            {/* AVAILABILITY (COLLAPSIBLE) */}
            <Section title="Availability">
              <details>
                <summary className="cursor-pointer text-sm text-[#C59D5F]">
                  Manage date ranges
                </summary>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Add one or more date ranges
                    </span>
                    <button
                      type="button"
                      onClick={addAvailability}
                      className="px-3 py-1 rounded border text-sm"
                      style={{ borderColor: "#F0F0F0" }}
                    >
                      + Add range
                    </button>
                  </div>

                  {availability.length === 0 && (
                    <div className="text-sm text-gray-400">
                      No availability ranges yet.
                    </div>
                  )}

                  {availability.map((r) => (
                    <div
                      key={r.id}
                      className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-gray-50 p-3 rounded-lg"
                      style={SMALL_BORDER_STYLE}
                    >
                      <input
                        type="date"
                        value={r.start}
                        onChange={(e) =>
                          updateAvailability(r.id, { start: e.target.value })
                        }
                        className="rounded-lg border px-3 py-2 text-sm"
                        style={INPUT_STYLE}
                      />
                      <input
                        type="date"
                        value={r.end}
                        onChange={(e) =>
                          updateAvailability(r.id, { end: e.target.value })
                        }
                        className="rounded-lg border px-3 py-2 text-sm"
                        style={INPUT_STYLE}
                      />
                      <input
                        value={r.notes}
                        onChange={(e) =>
                          updateAvailability(r.id, { notes: e.target.value })
                        }
                        placeholder="Notes"
                        className="rounded-lg border px-3 py-2 text-sm"
                        style={INPUT_STYLE}
                      />
                      <button
                        type="button"
                        onClick={() => removeAvailability(r.id)}
                        className="px-3 py-2 rounded border text-sm"
                        style={{ borderColor: "#F0F0F0" }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {errors.availability && (
                    <div className="text-xs text-red-500">
                      {errors.availability}
                    </div>
                  )}
                </div>
              </details>
            </Section>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-5">
            {/* Removed Tags & Amenities */}

            {/* MEDIA */}
            <Section title="Media">
              <div
                {...getRootProps()}
                className="rounded-lg p-4 border-dashed border-2 cursor-pointer hover:bg-gray-50 transition"
                style={{ borderColor: "#F0F0F0", background: "#FAFAFA" }}
              >
                <input {...getInputProps()} />
                <p className="text-sm text-gray-600">
                  Drag & drop photos/videos or click
                </p>
              </div>

              {/* Display Merged List */}
              <div className="mt-4 space-y-4">
                {/* Existing Photos/Videos */}
                {existingPhotos.length > 0 && (
                  <div>
                    <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Existing Photos</p>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {existingPhotos.map((p, i) => (
                        <div key={`ex-p-${i}`} className="relative w-28 h-20 rounded-lg overflow-hidden border soft-shadow group">
                          <img src={p.url} className="w-full h-full object-cover opacity-80" alt="" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                          <button
                            type="button"
                            onClick={() => removeExistingPhoto(i)}
                            className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-sm hover:bg-red-50"
                          >
                            <FiX size={12} className="text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {existingVideos.length > 0 && (
                  <div>
                    <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Existing Videos</p>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {existingVideos.map((v, i) => (
                        <div key={`ex-v-${i}`} className="relative w-28 h-20 rounded-lg overflow-hidden border soft-shadow group">
                          <video src={v.url} className="w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                          <button
                            type="button"
                            onClick={() => removeExistingVideo(i)}
                            className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-sm hover:bg-red-50"
                          >
                            <FiX size={12} className="text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Media */}
                {media.length > 0 && (
                  <div>
                    <p className="text-[10px] GOLD mb-1 uppercase tracking-wider">New Uploads</p>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {media.map((m, i) => (
                        <div key={`new-${i}`} className="relative w-28 h-20 rounded-lg overflow-hidden border-2 border-[#C59D5F]/30 soft-shadow">
                          {m.type === "video" ? (
                            <video src={m.preview} className="w-full h-full object-cover" />
                          ) : (
                            <img src={m.preview} className="w-full h-full object-cover" alt="" />
                          )}
                          <button
                            type="button"
                            onClick={() => removeMedia(i)}
                            className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-sm"
                          >
                            <FiX size={12} className="GOLD" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Section>

            {/* STICKY SUBMIT */}
            <div className="sticky top-4 bg-white p-4 rounded-xl soft-border">
              <div className="text-xs text-gray-500 mb-2">
                Upload progress: {progress}%
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full GOLD-bg text-white py-3 rounded-xl font-medium btn-lux"
              >
                {loading ? (editId ? "Updating..." : "Saving...") : (editId ? "Update Plan" : "Save Plan")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

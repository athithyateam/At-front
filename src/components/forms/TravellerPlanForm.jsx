import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX, FiUpload } from "react-icons/fi";
import { createItinerary, getItinerary, updateItinerary } from "../../api/itineraries";
import { useAuth } from "../../context/AuthContext";

/* ---------------- CONSTANTS ---------------- */
const POST_TYPE = "plan";
const emptyLocation = { city: "", state: "Uttarakhand", country: "India", address: "" };

const LOOKING_FOR_OPTIONS = [
  { label: "Anyone", value: "anyone" },
  { label: "Partner", value: "partner" },
  { label: "Group", value: "group" },
  { label: "Budget companions", value: "budget" },
];

/* ---------------- ANIMATED SELECT ---------------- */
function AnimatedSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <label className="text-xs muted mb-1 block">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input-lux cursor-pointer soft-border rounded-xl px-4 py-2 w-full flex justify-between"
      >
        <span>{value}</span>
        <FiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-40 mt-2 w-full bg-white soft-border rounded-xl soft-shadow"
          >
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-[#fbf6ea] ${opt === value ? "GOLD font-medium" : ""
                  }`}
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- INLINE ADDER ---------------- */
function InlineAdder({ placeholder, onAdd }) {
  const [value, setValue] = useState("");

  function commit() {
    const v = value.trim();
    if (!v) return;
    onAdd(v);
    setValue("");
  }

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center w-full">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        placeholder={placeholder}
        className="input-lux rounded-lg px-3 py-2 flex-1 min-w-[120px]"
      />
      <button
        type="button"
        onClick={commit}
        className="GOLD-bg text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap active:scale-95 transition"
      >
        Add
      </button>
    </div>
  );
}

/* ---------------- CATEGORY PILLS ---------------- */
function CategoryPills({ values, onAdd, onRemove }) {
  const OPTIONS = [
    "Trek",
    "Adventure",
    "Cultural",
    "Nature",
    "Spiritual",
    "Luxury",
    "Weekend",
    "Wildlife",
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {values.length === 0 && (
          <span className="text-sm muted">No categories selected</span>
        )}
        {values.map((v) => (
          <span key={v} className="pill GOLD flex items-center gap-2">
            {v}
            <button
              type="button"
              onClick={() => onRemove(v)}
              className="cursor-pointer hover:text-red-500"
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {OPTIONS.filter((o) => !values.includes(o)).map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onAdd(o)}
            className="pill soft-border text-gray-500 hover:bg-[#fbf6ea] cursor-pointer"
          >
            + {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SECTION ---------------- */
function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl soft-border soft-shadow">
      <h3 className="text-sm font-semibold GOLD mb-4">{title}</h3>
      {children}
    </div>
  );
}

/* ================= MAIN FORM ================= */
export default function TravellerPlanForm({ editId }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formError, setFormError] = useState("");

  /* core */
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [planName, setPlanName] = useState("");

  /* location & duration */
  const [location, setLocation] = useState(emptyLocation);
  const [days, setDays] = useState(1);
  const [nights, setNights] = useState(0);
  const [maxPeople, setMaxPeople] = useState(5);

  /* pricing */
  const [priceTotal, setPriceTotal] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [period, setPeriod] = useState("person");

  /* meta */
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [amenities, setAmenities] = useState([]);

  /* availability */
  const [availability, setAvailability] = useState([]);

  /* looking for */
  const [lookingFor, setLookingFor] = useState("anyone");

  /* photos */
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);

  /* ---------------- FETCH DATA IF EDITING ---------------- */
  useEffect(() => {
    if (editId) {
      const fetchData = async () => {
        try {
          const res = await getItinerary(editId);
          if (res.success) {
            const i = res.itinerary || res.post; // backend returns itinerary or post object
            setTitle(i.title || "");
            setDescription(i.description || "");
            setPlanName(i.plan?.name || "");
            setCategories(i.categories || []);
            setAmenities(i.amenities || []);
            setLocation(i.location || emptyLocation);
            setDays(i.duration?.days || 1);
            setNights(i.duration?.nights || 0);
            setMaxPeople(i.capacity?.maxPeople || 5);
            setPriceTotal(i.price?.total || "");
            setPricePerPerson(i.price?.perPerson || "");
            setPeriod(i.price?.period || "person");
            setExistingPhotos(i.photos || []);

            // availability
            if (i.availability?.ranges) {
              setAvailability(i.availability.ranges.map((r, idx) => ({ ...r, id: idx })));
            }

            // looking for from tags
            const lookTag = i.tags?.find(t => t.startsWith('looking:'));
            if (lookTag) setLookingFor(lookTag.split(':')[1]);

            // other tags
            setTags(i.tags?.filter(t => !t.startsWith('looking:')) || []);
          }
        } catch (err) {
          console.error("Fetch itinerary error:", err);
          setFormError("Failed to load itinerary data");
        }
      };
      fetchData();
    }
  }, [editId]);

  /* ---------------- PHOTOS ---------------- */
  const onDropPhotos = useCallback((files) => {
    setPhotos((p) => [
      ...p,
      ...files.map((f) => ({
        file: f,
        preview: URL.createObjectURL(f),
      })),
    ]);
  }, []);

  const photoDZ = useDropzone({
    onDrop: onDropPhotos,
    accept: { "image/*": [] },
  });

  useEffect(() => {
    return () => photos.forEach((p) => URL.revokeObjectURL(p.preview));
  }, [photos]);

  function removePhoto(index) {
    setPhotos((p) => p.filter((_, i) => i !== index));
  }

  function removeExistingPhoto(url) {
    setExistingPhotos((p) => p.filter((u) => u !== url));
  }

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!title.trim()) return "Title is required";
    if (!description.trim()) return "Description is required";
    if (!location.city || !location.state || !location.country)
      return "City, State and Country are required";
    if (days <= 0) return "Days must be greater than 0";
    if (!priceTotal && !pricePerPerson)
      return "Add total price or price per person";
    if (categories.length === 0) return "Select at least one category";
    return null;
  }

  /* ---------------- AVAILABILITY ---------------- */
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

  /* ---------------- SUBMIT ---------------- */
  async function handleSubmit(e) {
    e.preventDefault();

    const error = validate();
    if (error) {
      setFormError(error);
      return;
    }

    setFormError("");
    setLoading(true);

    // merge looking-for into tags
    const finalTags = [
      ...tags.filter((t) => !t.startsWith("looking:")),
      lookingFor !== "anyone" ? `looking:${lookingFor}` : null,
    ].filter(Boolean);

    const fd = new FormData();
    fd.append("postType", POST_TYPE);
    fd.append("title", title);
    fd.append("subtitle", subtitle);
    fd.append("description", description);
    fd.append("planName", planName);
    fd.append("location", JSON.stringify(location));
    fd.append("duration", JSON.stringify({ days: Number(days || 1), nights: Number(nights || 0) }));
    fd.append("capacity", JSON.stringify({ maxPeople: Number(maxPeople || 1) }));
    fd.append(
      "price",
      JSON.stringify({
        total: Number(priceTotal || 0),
        perPerson: Number(pricePerPerson || 0),
        period,
      })
    );
    fd.append("categories", JSON.stringify(categories));
    fd.append("tags", JSON.stringify(finalTags));
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

    fd.append("status", "active");
    fd.append("userRole", "guest");
    fd.append("isFeatured", JSON.stringify(false));

    // Flatten location fields for safety
    if (location.city) fd.append("city", location.city);
    if (location.state) fd.append("state", location.state);
    if (location.country) fd.append("country", location.country);

    // Photos
    photos.forEach(p => fd.append("photos", p.file));
    fd.append("existingPhotos", JSON.stringify(existingPhotos));

    try {
      const token = localStorage.getItem("auth_token");
      if (editId) {
        await updateItinerary(editId, fd, {
          token,
          onUploadProgress: (p) => setProgress(Math.floor(p || 0)),
        });
        alert("Itinerary updated successfully");
      } else {
        await createItinerary(fd, {
          token,
          onUploadProgress: (p) => setProgress(Math.floor(p || 0)),
        });
        alert("Itinerary created successfully");
        // reset
        setTitle("");
        setDescription("");
        setPlanName("");
        setLocation(emptyLocation);
        setCategories([]);
        setTags([]);
        setAmenities([]);
        setAvailability([]);
        setPhotos([]);
        setExistingPhotos([]);
      }
    } catch (err) {
      setFormError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="w-full ">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ================= TOP ================= */}
        <Section title="Basic details">
          <input
            className="input-lux rounded-lg px-3 py-2 w-full mb-3"
            placeholder="Plan name (optional)"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
          <div className="grid grid-cols-1 gap-3">
            <input
              className="input-lux rounded-lg px-3 py-2 w-full text-base font-medium"
              placeholder={`${user?.name || 'Guest'}’s invitation`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input-lux rounded-lg px-3 py-2 w-full text-sm"
              placeholder="any Uttarakhand place name"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div className="relative mt-2">
            <textarea
              rows={3}
              className="input-lux rounded-lg px-3 py-2 w-full"
              placeholder="Describe the plan"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 250))}
            />
            <div className="text-[10px] text-right text-gray-400 mt-1">
              {description.length}/250 characters
            </div>
          </div>
        </Section>

        {/* ================= 2 COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* -------- LEFT (MAIN) -------- */}
          <div className="lg:col-span-2 space-y-5">
            {/* LOOKING FOR */}
            <Section title="Looking for">
              <AnimatedSelect
                label="Travel companions"
                value={
                  LOOKING_FOR_OPTIONS.find((o) => o.value === lookingFor)?.label
                }
                options={LOOKING_FOR_OPTIONS.map((o) => o.label)}
                onChange={(label) =>
                  setLookingFor(
                    LOOKING_FOR_OPTIONS.find((o) => o.label === label)?.value ||
                    "anyone"
                  )
                }
              />
            </Section>

            <Section title="Location & trip details">
              {/* LOCATION */}
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Where does the trip start?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    className="input-lux rounded-lg px-3 py-2"
                    placeholder="City"
                    value={location.city}
                    onChange={(e) =>
                      setLocation({ ...location, city: e.target.value })
                    }
                  />
                  <input
                    className="input-lux rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
                    value={location.state}
                    readOnly
                  />
                  <input
                    className="input-lux rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
                    value={location.country}
                    readOnly
                  />
                </div>

                <input
                  className="input-lux rounded-lg px-3 py-2 w-full mt-2"
                  placeholder="Meeting point / landmark (optional)"
                  value={location.address}
                  onChange={(e) =>
                    setLocation({ ...location, address: e.target.value })
                  }
                />
              </div>

              {/* DIVIDER */}
              <div className="border-t border-gray-100 my-4" />

              {/* DURATION + GROUP */}
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  How long & how many people?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">
                      Days
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="input-lux rounded-lg px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">
                      Nights
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="input-lux rounded-lg px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">
                      Max people
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={maxPeople}
                      onChange={(e) => setMaxPeople(Number(e.target.value))}
                      className="input-lux rounded-lg px-3 py-2 w-full"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 mt-2">
                  Example: 5 days / 4 nights · Max 6 people
                </p>
              </div>
            </Section>

            {/* PRICING */}
            <Section title="Pricing">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Total price (optional)"
                  value={priceTotal}
                  onChange={(e) => setPriceTotal(e.target.value)}
                  className="input-lux rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Price per person"
                  value={pricePerPerson}
                  onChange={(e) => setPricePerPerson(e.target.value)}
                  className="input-lux rounded-lg px-3 py-2"
                />
                <AnimatedSelect
                  label="Charged per"
                  value={period}
                  options={["person", "group", "night"]}
                  onChange={setPeriod}
                />
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Example: ₹4000 per person
              </p>
            </Section>

            {/* AVAILABILITY (COLLAPSIBLE) */}
            <Section title="Availability">
              <details>
                <summary className="cursor-pointer text-sm text-[#C59D5F]">
                  Manage available dates
                </summary>

                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={addAvailability}
                    className="btn-lux soft-border"
                  >
                    + Add range
                  </button>

                  {availability.map((r) => (
                    <div key={r.id} className="grid md:grid-cols-4 gap-3">
                      <input
                        type="date"
                        value={r.start}
                        onChange={(e) =>
                          updateAvailability(r.id, { start: e.target.value })
                        }
                        className="input-lux rounded-lg px-3 py-2"
                      />
                      <input
                        type="date"
                        value={r.end}
                        onChange={(e) =>
                          updateAvailability(r.id, { end: e.target.value })
                        }
                        className="input-lux rounded-lg px-3 py-2"
                      />
                      <input
                        value={r.notes}
                        onChange={(e) =>
                          updateAvailability(r.id, { notes: e.target.value })
                        }
                        placeholder="Notes"
                        className="input-lux rounded-lg px-3 py-2"
                      />
                      <button
                        type="button"
                        onClick={() => removeAvailability(r.id)}
                        className="btn-lux soft-border"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </details>
            </Section>
          </div>

          {/* -------- RIGHT (META) -------- */}
          <div className="space-y-5">
            {/* PHOTOS */}
            <Section title="Photos">
              <div
                {...photoDZ.getRootProps()}
                className="rounded-lg p-4 text-center cursor-pointer soft-border border-dashed border-2 hover:bg-[#fbf6ea] transition-colors"
              >
                <input {...photoDZ.getInputProps()} />
                <FiUpload className="mx-auto mb-1 GOLD" size={18} />
                <p className="text-[10px] muted">Click or drag photos</p>
              </div>

              {(photos.length > 0 || existingPhotos.length > 0) && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {/* Existing */}
                  {existingPhotos.map((p, i) => (
                    <div key={`existing-${i}`} className="relative group">
                      <img
                        src={p.url}
                        alt=""
                        className="rounded-lg object-cover h-16 w-full opacity-70"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingPhoto(p)}
                        className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX size={10} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                  {/* New */}
                  {photos.map((p, i) => (
                    <div key={`new-${i}`} className="relative group">
                      <img
                        src={p.preview}
                        alt=""
                        className="rounded-lg object-cover h-16 w-full border border-yellow-200"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {/* CATEGORIES */}
            <Section title="Categories">
              <CategoryPills
                values={categories}
                onAdd={(v) => setCategories([...categories, v])}
                onRemove={(v) =>
                  setCategories(categories.filter((x) => x !== v))
                }
              />
            </Section>

            {/* Removed Tags & Amenities */}

            {/* SUBMIT */}
            <div className="sticky top-20 bg-white p-4 rounded-xl soft-border">
              {formError && (
                <div className="text-xs text-red-500 mb-2">{formError}</div>
              )}

              <div className="text-xs muted mb-2">
                Upload progress: {progress}%
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full GOLD-bg text-white py-3 rounded-xl"
              >
                {loading ? (editId ? "Updating..." : "Creating...") : (editId ? "Update Plans" : "Create Plans")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

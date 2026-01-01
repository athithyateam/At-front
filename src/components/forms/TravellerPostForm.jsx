// src/components/forms/TravellerPostForm.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX, FiUpload } from "react-icons/fi";
import { createPost } from "../../api/posts";

/* ---------------- CONSTANT ---------------- */
const POST_TYPE = "experience";

/* ---------------- UI HELPERS ---------------- */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 soft-border soft-shadow">
      <h3 className="text-sm font-semibold GOLD tracking-wide mb-4">{title}</h3>
      {children}
    </div>
  );
}

function AnimatedSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="text-xs muted mb-1 block">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input-lux rounded-xl px-4 py-2 w-full flex justify-between items-center"
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
            className="absolute z-40 mt-2 w-full bg-white rounded-xl soft-border soft-shadow"
          >
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#fbf6ea] ${
                  opt === value ? "GOLD font-medium" : "text-gray-600"
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

function InlineAdder({ placeholder, values, onAdd, onRemove }) {
  const [value, setValue] = useState("");
  const ref = useRef(null);

  const commit = () => {
    const v = value.trim();
    if (!v || values.includes(v)) return;
    onAdd(v);
    setValue("");
    ref.current?.focus();
  };

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), commit())}
          placeholder={placeholder}
          className="input-lux rounded-xl px-3 py-2 text-sm flex-1"
        />
        <button
          type="button"
          onClick={commit}
          className="btn-lux cursor-pointer soft-border px-4 text-gray-600"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <span
            key={v}
            className="pill soft-border flex items-center gap-2 text-sm"
          >
            {v}
            <button
              type="button"
              onClick={() => onRemove(v)}
              className="cursor-pointer"
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
        {values.length === 0 && (
          <span className="text-xs muted">No items added</span>
        )}
      </div>
    </div>
  );
}

function CategoryPills({ values, onAdd, onRemove }) {
  const OPTIONS = [
    "Trek",
    "Adventure",
    "Nature",
    "Spiritual",
    "Cultural",
    "Wildlife",
    "Luxury",
    "Weekend",
  ];

  return (
    <div>
      {/* Selected */}
      <div className="flex flex-wrap gap-2 mb-3">
        {values.length === 0 && (
          <span className="text-xs muted">No categories selected</span>
        )}

        {values.map((v) => (
          <motion.span
            key={v}
            layout
            className="pill GOLD soft-border flex items-center gap-2 text-sm"
          >
            {v}
            <button
              type="button"
              onClick={() => onRemove(v)}
              className="cursor-pointer"
            >
              <FiX size={14} />
            </button>
          </motion.span>
        ))}
      </div>

      {/* Available */}
      <div className="flex flex-wrap gap-2">
        {OPTIONS.filter((o) => !values.includes(o)).map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onAdd(o)}
            className="px-3 py-1.5 rounded-full soft-border text-sm text-gray-600 hover:bg-[#fbf6ea]"
          >
            + {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- MAIN FORM ---------------- */

export default function TravellerPostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Location fields
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  
  // Additional fields for experiences
  const [difficulty, setDifficulty] = useState("Easy");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [days, setDays] = useState("");
  const [nights, setNights] = useState("");

  /* ---------------- Photos ---------------- */
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

  /* ---------------- Submit ---------------- */
  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return alert("Title is required");
    if (!description.trim()) return alert("Description is required");
    if (photos.length === 0) {
      alert("Please upload at least one photo");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("categories", JSON.stringify(categories));
    fd.append("amenities", JSON.stringify(amenities));
    
    // -------- LOCATION FIELDS (FRONTEND) --------
    // The backend expects city, state, country as separate fields
    if (city) fd.append("city", city);
    if (state) fd.append("state", state);
    if (country) fd.append("country", country);
    
    // -------- ADDITIONAL FIELDS --------
    if (difficulty) fd.append("difficulty", difficulty);
    if (pricePerPerson) fd.append("pricePerPerson", pricePerPerson);
    if (maxPeople) fd.append("maxPeople", maxPeople);
    if (days) fd.append("days", days);
    if (nights) fd.append("nights", nights);

    // only attach coordinates if user actually selected them (not null, not undefined, not 0)
    console.log("Latitude:", latitude, "Longitude:", longitude);
    if (latitude != null && longitude != null && latitude !== 0 && longitude !== 0) {
      console.log("Adding coordinates to location");
      // Send location as a JSON string with proper GeoJSON structure
      const locationPayload = {
        coordinates: {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)], // [lng, lat]
        }
      };
      fd.append("location", JSON.stringify(locationPayload));
    }

    photos.forEach((p) => fd.append("photos", p.file));

    setLoading(true);
    try {
      await createPost(fd, {
        token: localStorage.getItem("auth_token"),
      });
      alert("Post created successfully");

      setTitle("");
      setDescription("");
      setCategories([]);
      setTags([]);
      setAmenities([]);
      setPhotos([]);
      setCity("");
      setState("");
      setCountry("India");
      setDifficulty("Easy");
      setPricePerPerson("");
      setMaxPeople("");
      setDays("");
      setNights("");
    } catch (error) {
      console.error("Post creation error:", error);
      alert(error.message || "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      {/* ================= POST DETAILS ================= */}
      <Section title="Post details">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="input-lux rounded-lg px-3 py-2 w-full text-base font-medium"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Describe the experience"
          className="input-lux rounded-lg px-3 py-2 w-full mt-2"
        />
      </Section>

      {/* ================= LOCATION ================= */}
      <Section title="Location">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs muted mb-1 block">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Sankri"
              className="input-lux rounded-xl px-3 py-2 w-full text-sm"
            />
          </div>

          <div>
            <label className="text-xs muted mb-1 block">State/Province</label>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g. Uttarakhand"
              className="input-lux rounded-xl px-3 py-2 w-full text-sm"
            />
          </div>

          <div>
            <label className="text-xs muted mb-1 block">Country</label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. India"
              className="input-lux rounded-xl px-3 py-2 w-full text-sm"
            />
          </div>
        </div>
      </Section>

      {/* ================= EXPERIENCE DETAILS ================= */}
      <Section title="Experience details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedSelect
            label="Difficulty"
            value={difficulty}
            options={["Easy", "Moderate", "Challenging", "Difficult"]}
            onChange={setDifficulty}
          />

          <div>
            <label className="text-xs muted mb-1 block">Price per person (₹)</label>
            <input
              type="number"
              value={pricePerPerson}
              onChange={(e) => setPricePerPerson(e.target.value)}
              placeholder="e.g. 18000"
              className="input-lux rounded-xl px-3 py-2 w-full text-sm"
            />
          </div>

          <div>
            <label className="text-xs muted mb-1 block">Max people</label>
            <input
              type="number"
              value={maxPeople}
              onChange={(e) => setMaxPeople(e.target.value)}
              placeholder="e.g. 15"
              className="input-lux rounded-xl px-3 py-2 w-full text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs muted mb-1 block">Days</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="e.g. 6"
                className="input-lux rounded-xl px-3 py-2 w-full text-sm"
              />
            </div>
            <div>
              <label className="text-xs muted mb-1 block">Nights</label>
              <input
                type="number"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                placeholder="e.g. 5"
                className="input-lux rounded-xl px-3 py-2 w-full text-sm"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ================= CLASSIFICATION ================= */}
      <Section title="Classification">
        <div className="space-y-5">
          {/* CATEGORIES */}
          <div className="rounded-lg border input-lux bg-[#fffdf8] p-4">
            <div className="mb-2">
              <h4 className="text-sm font-semibold text-[#C59D5F]">
                Category <span className="text-red-500">*</span>
              </h4>
              <p className="text-xs text-gray-500">
                What kind of experience is this?
              </p>
            </div>

            <CategoryPills
              values={categories}
              onAdd={(v) => setCategories([...categories, v])}
              onRemove={(v) => setCategories(categories.filter((x) => x !== v))}
            />

            {categories.length === 0 && (
              <p className="text-xs text-red-500 mt-2">
                Select at least one category
              </p>
            )}
          </div>

          {/* TAGS */}
          <div className="rounded-lg border bg-white p-4 input-lux">
            <div className="mb-2">
              <h4 className="text-sm font-semibold text-[#C59D5F]">
                Search tags
              </h4>
              <p className="text-xs text-gray-500">
                Keywords travellers may search
              </p>
            </div>

            <InlineAdder
              placeholder="e.g. beginner, winter, budget"
              values={tags}
              onAdd={(v) => setTags([...tags, v])}
              onRemove={(v) => setTags(tags.filter((x) => x !== v))}
            />
          </div>

          {/* AMENITIES */}
          <div className="rounded-lg border bg-white p-4 input-lux">
            <div className="mb-2">
              <h4 className="text-sm font-semibold text-[#C59D5F]">
                Amenities
              </h4>
              <p className="text-xs text-gray-500">
                What’s included in the experience
              </p>
            </div>

            <InlineAdder
              placeholder="e.g. meals, guide, transport"
              values={amenities}
              onAdd={(v) => setAmenities([...amenities, v])}
              onRemove={(v) => setAmenities(amenities.filter((x) => x !== v))}
            />
          </div>
        </div>
      </Section>

      {/* ================= PHOTOS ================= */}
      <Section title="Photos">
        <div
          {...photoDZ.getRootProps()}
          className="rounded-lg p-4 text-center cursor-pointer soft-border hover:bg-[#fbf6ea]"
        >
          <input {...photoDZ.getInputProps()} />
          <FiUpload className="mx-auto mb-1 GOLD" size={18} />
          <p className="text-sm muted">Click or drag photos</p>
        </div>

        {photos.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-3">
            {photos.map((p, i) => (
              <div key={i} className="relative">
                <img
                  src={p.preview}
                  alt=""
                  className="rounded-lg object-cover h-20 w-full"
                />
                <button
                  type="button"
                  onClick={() =>
                    setPhotos(photos.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-1 right-1 bg-white rounded-full p-1 soft-shadow"
                >
                  <FiX size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ================= SUBMIT ================= */}
      <div className="flex justify-end">
        <button
          disabled={loading}
          className="GOLD-bg text-white px-6 py-2.5 rounded-lg font-medium btn-lux"
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </div>
    </form>
  );
}

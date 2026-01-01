// src/components/host/HostServiceForm.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX, FiUpload } from "react-icons/fi";
import * as ServicesAPI from "../../api/services";

const GOLD = "#C59D5F";
const INPUT_STYLE = { borderColor: "#F0F0F0", background: "#FAFBFB" };

/* ---------------- small presentational helpers ---------------- */
function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl soft-border soft-shadow w-full">
      <h3 className="text-sm font-semibold mb-3" style={{ color: GOLD }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function InlineAdder({ placeholder, values = [], onAdd, onRemove }) {
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
          style={INPUT_STYLE}
        />
        <button
          type="button"
          onClick={commit}
          className="btn-lux soft-border px-4"
          aria-label={`Add ${placeholder}`}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <span
            key={v}
            className="pill soft-border flex items-center gap-2 text-sm"
            aria-label={`item ${v}`}
          >
            <span>{v}</span>
            <button
              type="button"
              onClick={() => onRemove(v)}
              className="p-1 cursor-pointer hover:text-red-400"
              aria-label={`Remove ${v}`}
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
        {values.length === 0 && (
          <div className="text-xs muted">No items added</div>
        )}
      </div>
    </div>
  );
}

/* Animated select used in other forms */
function AnimatedSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div ref={ref} className="relative w-full">
      <label className="text-xs muted mb-1 block">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="input-lux rounded-xl px-4 py-2 w-full flex justify-between items-center"
        style={INPUT_STYLE}
      >
        <span>{value}</span>
        <FiChevronDown
          className={open ? "rotate-180 transition" : "transition"}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-40 mt-2 w-full bg-white rounded-xl soft-border soft-shadow"
          >
            {options.map((o) => (
              <li
                key={o}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-[#fbf6ea] ${
                  o === value ? "font-medium" : "text-gray-600"
                }`}
              >
                {o}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Privacy Policy — add sentences and show numbered list */
function PolicyAdder({ policies = [], onAdd, onRemove }) {
  const [value, setValue] = useState("");
  const ref = useRef(null);

  const commit = () => {
    const v = value.trim();
    if (!v) return;
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
          placeholder="Type one policy sentence"
          className="input-lux rounded-xl px-3 py-2 text-sm flex-1"
          style={INPUT_STYLE}
        />
        <button
          type="button"
          onClick={commit}
          className="btn-lux soft-border px-4"
        >
          Add
        </button>
      </div>

      {policies.length === 0 && (
        <div className="text-xs muted">No policies added</div>
      )}

      <ol className="list-decimal pl-5 space-y-2 text-sm mt-2">
        {policies.map((p, i) => (
          <li key={i} className="flex justify-between gap-4 items-start">
            <span className="pr-4">{p}</span>
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="p-1 cursor-pointer hover:text-red-400"
              aria-label={`Remove policy ${i + 1}`}
            >
              <FiX size={14} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------------- Host Service Form ---------------- */
export default function HostServiceForm({ onSaved }) {
  // core
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  // categories (pills), tags
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // amenities (merged with categories/tags UI)
  const [amenities, setAmenities] = useState([]);

  // privacy policies (numbered sentences)
  const [privacyPolicies, setPrivacyPolicies] = useState([]);

  // pricing / capacity
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState(1);

  // scheduling
  const [duration, setDuration] = useState(1);
  const [period, setPeriod] = useState("hour"); // hour/day/session

  // media
  const [media, setMedia] = useState([]); // {file, preview}
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  // location
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [country, setCountry] = useState("India");
  const [meetingPoint, setMeetingPoint] = useState("");

  // dropzone
  const onDrop = useCallback((files) => {
    if (!files || files.length === 0) return;
    setMedia((m) => [
      ...m,
      ...files.map((f) => ({ file: f, preview: URL.createObjectURL(f) })),
    ]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 10,
  });

  useEffect(() => {
    return () =>
      media.forEach((m) => m.preview && URL.revokeObjectURL(m.preview));
  }, [media]);

  // helpers for pills
  function addCategory(v) {
    if (!v) return;
    setCategories((c) => (c.includes(v) ? c : [...c, v]));
  }
  function removeCategory(v) {
    setCategories((c) => c.filter((x) => x !== v));
  }
  function addTag(v) {
    if (!v) return;
    setTags((t) => (t.includes(v) ? t : [...t, v]));
  }
  function removeTag(v) {
    setTags((t) => t.filter((x) => x !== v));
  }
  function addAmenity(v) {
    if (!v) return;
    setAmenities((a) => (a.includes(v) ? a : [...a, v]));
  }
  function removeAmenity(v) {
    setAmenities((a) => a.filter((x) => x !== v));
  }

  // policy helpers
  function addPolicy(sentence) {
    setPrivacyPolicies((p) => [...p, sentence]);
  }
  function removePolicy(index) {
    setPrivacyPolicies((p) => p.filter((_, i) => i !== index));
  }

  function removeMedia(i) {
    setMedia((m) => {
      const item = m[i];
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return m.filter((_, idx) => idx !== i);
    });
  }

  function validate() {
    if (!title.trim()) return "Title required";
    if (!summary.trim()) return "Short summary required";
    if (!description.trim()) return "Description required";
    if (!price) return "Price required";
    if (!city.trim() || !stateField.trim())
      return "City and State are required";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    const fd = new FormData();
    fd.append("postType", "service");
    fd.append("title", title);
    fd.append("summary", summary);
    fd.append("description", description);
    fd.append(
      "price",
      JSON.stringify({
        perPerson: Number(price || 0),
        currency: "INR",
        period,
      })
    );
    fd.append("availability", JSON.stringify({ isAvailable: true }));

    fd.append(
      "capacity",
      JSON.stringify({ maxPeople: Number(maxPeople || 1) })
    );
    fd.append("duration", JSON.stringify({ days: 1, nights: 0 }));

    fd.append(
      "location",
      JSON.stringify({
        city,
        state: stateField,
        country,
        meetingPoint,
      })
    );

    if (categories.length) fd.append("categories", JSON.stringify(categories));
    if (tags.length) fd.append("tags", JSON.stringify(tags));
    if (amenities.length) fd.append("amenities", JSON.stringify(amenities));
    if (privacyPolicies.length)
      fd.append("privacyPolicy", JSON.stringify(privacyPolicies));

    media.forEach((m) => fd.append("photos", m.file));

    setLoading(true);
    setProgress(0);
    try {
      const token = window.localStorage.getItem("auth_token");
      const res = await ServicesAPI.createService(fd, {
        token,
        onUploadProgress: (evtPercent) => {
          // support both direct percent or evt.loaded/evt.total if used differently
          const p = Math.floor(evtPercent || 0);
          setProgress(p);
        },
      });

      if (res?.success) {
        alert("Service created successfully");
        // reset form to defaults
        setTitle("");
        setSummary("");
        setDescription("");
        setPrice("");
        setMaxPeople(1);
        setDuration(1);
        setPeriod("hour");
        setCategories([]);
        setTags([]);
        setAmenities([]);
        setPrivacyPolicies([]);
        media.forEach((m) => m.preview && URL.revokeObjectURL(m.preview));
        setMedia([]);
        if (typeof onSaved === "function") onSaved(res.post);
      } else {
        console.warn("unexpected", res);
        alert("Saved but unexpected response");
      }
    } catch (err) {
      console.error(err);
      alert("Save failed — check console");
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= LEFT (PRIMARY) ================= */}
        <div className="lg:col-span-2 space-y-5">
          {/* BASIC */}
          <Section title="Basic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className="input-lux rounded-lg px-3 py-2 w-full"
                placeholder="Service title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={INPUT_STYLE}
              />
              <input
                className="input-lux rounded-lg px-3 py-2 w-full"
                placeholder="Short summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                style={INPUT_STYLE}
              />
            </div>

            <textarea
              rows={3}
              className="input-lux rounded-lg px-3 py-2 w-full mt-3"
              placeholder="Full description, inclusions, duration, pre-reqs…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={INPUT_STYLE}
            />
          </Section>

          <Section title="Location">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="input-lux rounded-lg px-3 py-2"
                placeholder="City (e.g. Rishikesh)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={INPUT_STYLE}
              />

              <input
                className="input-lux rounded-lg px-3 py-2"
                placeholder="State (e.g. Uttarakhand)"
                value={stateField}
                onChange={(e) => setStateField(e.target.value)}
                style={INPUT_STYLE}
              />

              <input
                className="input-lux rounded-lg px-3 py-2"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={INPUT_STYLE}
              />
            </div>

            <input
              className="input-lux rounded-lg px-3 py-2 w-full mt-3"
              placeholder="Meeting point (optional)"
              value={meetingPoint}
              onChange={(e) => setMeetingPoint(e.target.value)}
              style={INPUT_STYLE}
            />
          </Section>

          {/* PRICING + SCHEDULING */}
          <Section title="Pricing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* PRICE */}
              <div>
                <label className="text-xs muted mb-1 block">
                  Price per person
                </label>
                <div
                  className="flex rounded-lg overflow-hidden border"
                  style={INPUT_STYLE}
                >
                  <span className="px-3 flex items-center bg-[#f9f6ef] text-sm text-gray-600">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* DURATION VALUE */}
              <div>
                <label className="text-xs muted mb-1 block">Duration</label>
                <input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="input-lux rounded-lg px-3 py-2 w-full"
                  style={INPUT_STYLE}
                />
              </div>

              {/* PERIOD */}
              <AnimatedSelect
                label="Charged per"
                value={period}
                options={["hour", "day", "session"]}
                onChange={setPeriod}
              />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Example: ₹2000 per person / day
            </p>
          </Section>

          {/* CATEGORIES / TAGS / AMENITIES (COLLAPSIBLE) */}
          <Section title="Categories, Tags & Amenities">
            <details>
              <summary className="cursor-pointer text-sm text-[#C59D5F]">
                Manage categories, tags & amenities
              </summary>

              <div className="mt-4 space-y-5">
                {/* Categories */}
                <div>
                  <div className="text-sm font-medium text-[#C59D5F] mb-2">
                    Categories
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      "Adventure",
                      "Cultural",
                      "Nature",
                      "Photography",
                      "Camping",
                      "Mountain",
                      "Wildlife",
                      "Spiritual",
                      "Beach",
                      "Desert",
                      "Forest",
                      "Historical",
                      "Pilgrimage",
                      "Snow",
                      "Backpacking",
                      "Luxury",
                      "Budget",
                    ].map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => addCategory(o)}
                        className="px-3 py-1.5 rounded-full text-sm border border-dashed hover:bg-[#fbf6ea]"
                      >
                        + {o}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <span
                        key={c}
                        className="
    inline-flex items-center gap-2
    px-3 py-1.5 rounded-full text-sm
    bg-[#fff6e5]
    border border-[#e7cfa3]
    text-[#7a5a16]
    shadow-sm
  "
                      >
                        {c}
                        <button
                          type="button"
                          onClick={() => removeCategory(c)}
                          className="text-[#b0892b] hover:text-red-500 transition"
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <InlineAdder
                  placeholder="Add tag"
                  values={tags}
                  onAdd={addTag}
                  onRemove={removeTag}
                />

                {/* Amenities */}
                <InlineAdder
                  placeholder="Add amenity"
                  values={amenities}
                  onAdd={addAmenity}
                  onRemove={removeAmenity}
                />
              </div>
            </details>
          </Section>

          {/* PRIVACY POLICY (COLLAPSIBLE) */}
          <Section title="Host Policy">
            <details>
              <summary className="cursor-pointer text-sm text-[#C59D5F]">
                Add numbered rules
              </summary>

              <div className="mt-4">
                <PolicyAdder
                  policies={privacyPolicies}
                  onAdd={addPolicy}
                  onRemove={removePolicy}
                />
              </div>
            </details>
          </Section>
        </div>

        {/* ================= RIGHT (SECONDARY) ================= */}
        <div className="space-y-5">
          {/* MEDIA */}
          <Section title="Media">
            <div
              {...getRootProps()}
              className="rounded-lg p-4 border-dashed cursor-pointer"
              style={{ borderColor: "#F0F0F0", background: "#FAFAFB" }}
            >
              <input {...getInputProps()} />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiUpload />
                Drag & drop images (max 10)
              </div>
            </div>

            {media.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {media.map((m, i) => (
                  <div
                    key={i}
                    className="relative w-28 h-20 rounded overflow-hidden border"
                  >
                    <img
                      src={m.preview}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedia(i)}
                      className="absolute top-1 right-1 bg-white rounded-full px-1 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* STICKY SUBMIT */}
          <div className="sticky top-20 bg-white p-4 rounded-xl soft-border">
            <div className="text-xs muted mb-2">
              Upload progress: {progress}%
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-medium"
              style={{
                background: GOLD,
                boxShadow: "0 8px 22px rgba(197,157,95,0.16)",
              }}
            >
              {loading ? "Saving..." : "Save Service"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

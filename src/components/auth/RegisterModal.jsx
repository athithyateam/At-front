// src/components/auth/RegisterModal.jsx
import React, { useEffect, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { signupInitiateApi } from "../../api/authApi";

const ROLE_TABS = [
  { value: "guest", label: "Guest" },
  { value: "host", label: "Host" },
  // { value: "admin", label: "Admin" },
];

export default function RegisterModal({ onClose, onSwitchToLogin, onProceedOTP }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState("guest");
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const GOLD = "#d4af37";

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev || "";
    };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const res = await signupInitiateApi({
      firstname,
      lastname,
      email,
      password: pwd,
      role,
    });

    setLoading(false);

    if (!res.ok) {
      setErr(res.message || "Could not send OTP.");
      return;
    }

    // Move to OTP screen with the same payload
    onProceedOTP?.({ firstname, lastname, email, password: pwd, role });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute cursor-pointer top-3 right-3 hover:opacity-80" style={{ color: GOLD }} onClick={onClose} aria-label="Close">✕</button>

        <div className="flex border-b mb-4" style={{ borderColor: `${GOLD}66` }}>
          <button className="w-1/2 py-2 cursor-pointer text-center font-semibold text-gray-400" onClick={onSwitchToLogin}>Login</button>
          <button className="w-1/2 py-2 cursor-pointer text-center font-semibold border-b-2" style={{ color: GOLD, borderColor: GOLD }}>Register</button>
        </div>

        <div className="flex mb-4 rounded-lg overflow-hidden border" style={{ borderColor: `${GOLD}66` }}>
          {ROLE_TABS.map((t) => {
            const active = role === t.value;
            return (
              <button key={t.value} type="button" onClick={() => setRole(t.value)} className="flex-1 py-2 text-sm font-medium transition"
                style={{ backgroundColor: active ? GOLD : "white", color: active ? "white" : GOLD }}>
                {t.label}
              </button>
            );
          })}
        </div>

        {err && <div className="mb-3 text-sm bg-red-50 text-red-700 border border-red-200 rounded px-3 py-2">{err}</div>}

        <form onSubmit={submit} className="space-y-4">
          <button type="button" className="flex items-center justify-center gap-2 w-full py-2 border rounded-lg transition" style={{ borderColor: GOLD, color: GOLD }}>
            <FaGoogle /> Sign up with Google
          </button>

          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="border rounded-lg p-2 border-gray-300" required />
            <input type="text" placeholder="Last name" value={lastname} onChange={(e) => setLastname(e.target.value)} className="border rounded-lg p-2 border-gray-300" required />
          </div>

          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg p-2 border-gray-300" required />

          <div className="relative">
            <input type={showPwd ? "text" : "password"} placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} className="w-full border rounded-lg p-2 border-gray-300 pr-10" required minLength={6} />
            <span className="absolute right-3 top-2.5 cursor-pointer" style={{ color: GOLD }} onClick={() => setShowPwd((v) => !v)}>{showPwd ? <FaEyeSlash /> : <FaEye />}</span>
          </div>

          <button type="submit" disabled={loading} className="w-full cursor-pointer text-white py-2 rounded-lg disabled:opacity-70"
            style={{ backgroundColor: GOLD }}>
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

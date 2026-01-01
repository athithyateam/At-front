// src/components/auth/OtpModal.jsx
import React, { useEffect, useState } from "react";
import { signupCompleteApi, signupInitiateApi } from "../../api/authApi";

const GOLD = "#d4af37";

export default function OtpModal({ regData, onClose, onBack, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const res = await signupCompleteApi({ ...regData, otp: otp.trim() });
    setLoading(false);

    if (!res.ok) {
      setErr(res.message || "Invalid OTP.");
      return;
    }

    const token = res.data?.token;
    if (token) localStorage.setItem("auth_token", token);

    onSuccess?.(res.data); // triggers redirect
    onClose?.();
  };

  const resend = async () => {
    setErr("");
    setInfo("");
    setLoading(true);
    const res = await signupInitiateApi(regData);
    setLoading(false);
    if (!res.ok) setErr(res.message || "Could not resend OTP.");
    else setInfo("OTP resent to your email.");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute cursor-pointer top-3 right-3 hover:opacity-80"
          style={{ color: GOLD }}
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-1" style={{ color: GOLD }}>
          Verify Email
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Enter the 6-digit OTP sent to{" "}
          <span className="font-medium">{regData?.email}</span>.
        </p>

        {err && (
          <div className="mb-3 text-sm bg-red-50 text-red-700 border border-red-200 rounded px-3 py-2">
            {err}
          </div>
        )}
        {info && (
          <div className="mb-3 text-sm bg-green-50 text-green-700 border border-green-200 rounded px-3 py-2">
            {info}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full border rounded-lg p-2"
            required
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="underline"
              style={{ color: GOLD }}
            >
              Back
            </button>
            <button
              type="button"
              onClick={resend}
              disabled={loading}
              className="underline"
              style={{ color: GOLD }}
            >
              Resend OTP
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full cursor-pointer text-white py-2 rounded-lg disabled:opacity-70"
            style={{ backgroundColor: GOLD }}
          >
            {loading ? "Verifying..." : "Verify & Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState, useCallback } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { signinApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal({ onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  const GOLD = "#d4af37";

  /* ---------------- Scroll lock helpers ---------------- */

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  /* ---------------- Lock scroll on mount ---------------- */

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        unlockScroll();
        onClose?.();
      }
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev || "";
    };
  }, [onClose, unlockScroll]);

  /* ---------------- Submit ---------------- */

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setErr("");
    setLoading(true);

    try {
      const res = await signinApi({ email, password: pwd });

      if (!res?.ok) {
        setErr(res?.message || "Invalid email or password");
        return;
      }

      const token =
        res?.data?.token ||
        res?.data?.data?.token ||
        res?.token;

      if (!token) {
        setErr("Authentication token not received");
        return;
      }

      // Save token
      localStorage.setItem("auth_token", token);

      // Fetch user (wait!)
      await fetchUser();

      //  IMPORTANT: unlock scroll BEFORE navigation
      unlockScroll();

      //  Navigate
      navigate("/explore", { replace: true });

      // Close modal
      onClose?.();
    } catch (error) {
      console.error("Login error:", error);
      setErr("Unexpected login error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Render ---------------- */

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50"
      onClick={() => {
        unlockScroll();
        onClose?.();
      }}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="absolute top-3 right-3 cursor-pointer hover:opacity-80"
          style={{ color: GOLD }}
          onClick={() => {
            unlockScroll();
            onClose?.();
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Tabs */}
        <div className="flex border-b mb-6" style={{ borderColor: `${GOLD}66` }}>
          <button
            type="button"
            className="w-1/2 py-2 text-center font-semibold border-b-2"
            style={{ color: GOLD, borderColor: GOLD }}
          >
            Login
          </button>
          <button
            type="button"
            className="w-1/2 py-2 text-center font-semibold text-gray-400 hover:opacity-80"
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </div>

        {err && (
          <div className="mb-3 text-sm bg-red-50 text-red-700 border border-red-200 rounded px-3 py-2">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {/* Google Login (placeholder) */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full py-2 border rounded-lg transition"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            <FaGoogle /> Login with Google
          </button>

          <div className="text-center text-gray-400 text-sm">OR</div>

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full border rounded-lg p-2 focus:outline-none"
            style={{ borderColor: GOLD }}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Password"
              required
              className="w-full border rounded-lg p-2 pr-10 focus:outline-none"
              style={{ borderColor: GOLD }}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer"
              style={{ color: GOLD }}
              onClick={() => setShowPwd((v) => !v)}
            >
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full text-white py-2 rounded-lg disabled:opacity-70 transition"
            style={{ backgroundColor: GOLD }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

import React, { useEffect, useState, useCallback } from "react";
import { FaGoogle, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { signinApi, forgotPasswordApi, resetPasswordApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal({ onClose, onSwitchToRegister }) {
  // View state: 'login', 'forgot-email', 'reset-password'
  const [view, setView] = useState("login");

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [otp, setOtp] = useState("");

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

  /* ---------------- Clear errors on view switch ---------------- */
  useEffect(() => {
    setErr("");
    setSuccessMsg("");
  }, [view]);

  /* ---------------- Submit Handlers ---------------- */

  const handleLogin = async (e) => {
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

  const handleForgotEmailSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setErr("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await forgotPasswordApi({ email });

      if (!res?.ok) {
        setErr(res?.message || "Failed to send OTP");
        return;
      }

      setSuccessMsg("OTP sent successfully to your email.");
      setTimeout(() => {
        setView("reset-password");
        setSuccessMsg("");
      }, 1500);

    } catch (error) {
      setErr("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (pwd !== confirmPwd) {
      setErr("Passwords do not match");
      return;
    }

    setErr("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await resetPasswordApi({ email, otp, newPassword: pwd });

      if (!res?.ok) {
        setErr(res?.message || "Failed to reset password");
        return;
      }

      setSuccessMsg("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        setView("login");
        setPwd("");
        setConfirmPwd("");
        setOtp("");
        setSuccessMsg("");
      }, 2000);

    } catch (error) {
      setErr("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Render ---------------- */

  const renderLogin = () => (
    <>
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

      <form onSubmit={handleLogin} className="space-y-4">
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
        <div>
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
          <div className="text-right mt-1">
            <button
              type="button"
              onClick={() => setView("forgot-email")}
              className="text-xs hover:underline"
              style={{ color: GOLD }}
            >
              Forgot Password?
            </button>
          </div>
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
    </>
  );

  const renderForgotEmail = () => (
    <>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setView("login")}
          className="mr-3 hover:opacity-80 transition"
          style={{ color: GOLD }}
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-semibold" style={{ color: GOLD }}>Forgot Password</h2>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        Enter your email address and we'll send you an OTP to reset your password.
      </p>

      <form onSubmit={handleForgotEmailSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full border rounded-lg p-2 focus:outline-none"
          style={{ borderColor: GOLD }}
        />

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full text-white py-2 rounded-lg disabled:opacity-70 transition"
          style={{ backgroundColor: GOLD }}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </>
  );

  const renderResetPassword = () => (
    <>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setView("forgot-email")}
          className="mr-3 hover:opacity-80 transition"
          style={{ color: GOLD }}
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-semibold" style={{ color: GOLD }}>Reset Password</h2>
      </div>

      <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
        {/* OTP */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">OTP Code</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            required
            className="w-full border rounded-lg p-2 focus:outline-none"
            style={{ borderColor: GOLD }}
          />
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="New Password"
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

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPwd ? "text" : "password"}
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            placeholder="Confirm New Password"
            required
            className="w-full border rounded-lg p-2 pr-10 focus:outline-none"
            style={{ borderColor: GOLD }}
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer"
            style={{ color: GOLD }}
            onClick={() => setShowConfirmPwd((v) => !v)}
          >
            {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full text-white py-2 rounded-lg disabled:opacity-70 transition"
          style={{ backgroundColor: GOLD }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
      onClick={() => {
        unlockScroll();
        onClose?.();
      }}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md p-6 relative mx-4"
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

        {err && (
          <div className="mb-4 text-sm bg-red-50 text-red-700 border border-red-200 rounded px-3 py-2">
            {err}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 text-sm bg-green-50 text-green-700 border border-green-200 rounded px-3 py-2">
            {successMsg}
          </div>
        )}

        {view === "login" && renderLogin()}
        {view === "forgot-email" && renderForgotEmail()}
        {view === "reset-password" && renderResetPassword()}

      </div>
    </div>,
    document.body
  );
}

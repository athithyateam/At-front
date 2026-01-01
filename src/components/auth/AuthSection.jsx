import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import OtpModal from "./OtpModal";

export default function AuthSection({ onClose }) {
  const [screen, setScreen] = useState("login");
  const [regData, setRegData] = useState(null);
  const navigate = useNavigate();

  if (screen === "register") {
    return (
      <RegisterModal
        onClose={onClose}
        onSwitchToLogin={() => setScreen("login")}
        onProceedOTP={(data) => {
          setRegData(data);
          setScreen("otp");
        }}
      />
    );
  }

  if (screen === "otp") {
    return (
      <OtpModal
        regData={regData}
        onClose={onClose}
        onBack={() => setScreen("register")}
        onSuccess={() => {
          onClose?.();
          navigate("/explore");
        }}
      />
    );
  }

  return (
    <LoginModal
      onClose={onClose}
      onSwitchToRegister={() => setScreen("register")}
    />
  );
}

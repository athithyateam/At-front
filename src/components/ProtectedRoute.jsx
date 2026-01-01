import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const token = localStorage.getItem("auth_token");

  // ⏳ While checking auth, don't redirect yet
  if (loading) {
    return null;
  }

  // 🔒 No user AND no token → block
  if (!user && !token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // ✅ Either user exists OR token exists (user may be loading)
  return children;
}

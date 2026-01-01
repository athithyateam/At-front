/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getUserDetailsApi } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch logged-in user using token
   */
  const fetchUser = useCallback(async () => {
    setLoading(true);

    const token = localStorage.getItem("auth_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await getUserDetailsApi();

      if (res?.ok && res?.data?.data?.user) {
        setUser(res.data.data.user);
      } else {
        setUser(null);
        // localStorage.removeItem("auth_token"); // safety
      }
    } catch (error) {
      console.error("Auth fetchUser failed:", error);
      setUser(null);
      localStorage.removeItem("auth_token");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Run once on app load
   */
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /**
   * Logout user completely
   */
  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        fetchUser,
        logout,
        setUser, // exposed for edge cases only
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};

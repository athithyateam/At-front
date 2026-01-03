import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export function useNotifications() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("ath_notifications");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setNotifications(parsed);
                setUnreadCount(parsed.filter((n) => !n.read).length);
            } catch (e) {
                console.error("Failed to parse notifications", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("ath_notifications", JSON.stringify(notifications));
        setUnreadCount(notifications.filter((n) => !n.read).length);
    }, [notifications]);

    // Add a notification
    const addNotification = ({ title, message, type = "info", link = null }) => {
        const newNotif = {
            id: Date.now(),
            title,
            message,
            type,
            link,
            read: false,
            date: new Date().toISOString(),
        };
        setNotifications((prev) => [newNotif, ...prev]);
    };

    // Mark all as read
    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, read: true }))
        );
    };

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const clearNotifications = () => {
        setNotifications([]);
    }

    // SIMULATION: Occasionally add a fake interaction from another user to demonstrate
    useEffect(() => {
        if (!user) return;

        // Only run this once per session or very rarely
        // const hasSimulated = sessionStorage.getItem("simulated_notif");
        //if (hasSimulated) return;

        const timer = setTimeout(() => {
            // addNotification({
            //   title: "New Reaction",
            //   message: "Aarav Mehta reacted key with ❤️ to your post",
            //   type: "reaction",
            // });
            // sessionStorage.setItem("simulated_notif", "true");
        }, 15000);

        return () => clearTimeout(timer);
    }, [user]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                addNotification,
                markAllAsRead,
                markAsRead,
                clearNotifications
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

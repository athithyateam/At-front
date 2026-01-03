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

    // SIMULATION: Smart Ecosystem Events
    useEffect(() => {
        if (!user) return;

        // Helper to generate random notifications based on role
        const triggerSimulation = () => {
            const isHost = user.role === "host";

            const hostEvents = [
                { title: "New Reaction", message: "Aarav Mehta liked your Kedarkantha Plan ❤️", type: "info" },
                { title: "Booking Inquiry", message: "Sarah requested dates for 'Valley of Flowers' 📅", type: "success" },
                { title: "New Review", message: "You received a 5-star review from Rohan! ⭐", type: "success" },
                { title: "Trending", message: "Your 'Winter Trek' is getting high traffic today 📈", type: "info" }
            ];

            const guestEvents = [
                { title: "New Adventure", message: "Himalayan Explorers posted a new itinerary: 'Roopkund Trek' 🏔️", type: "info" },
                { title: "Price Drop", message: "20% off on 'Rishikesh Rafting' for this weekend! 🏷️", type: "success" },
                { title: "Community", message: "3 travelers are looking for partners for 'Spiti Valley' 👥", type: "info" },
                { title: "Recommendation", message: "Based on your likes, check out 'Manali Backpacking' 🎒", type: "info" }
            ];

            const pool = isHost ? hostEvents : guestEvents;
            const randomEvent = pool[Math.floor(Math.random() * pool.length)];

            addNotification(randomEvent);
        };

        // Trigger one notification 5 seconds after login/load to wow the user
        const initialTimer = setTimeout(triggerSimulation, 5000);

        // Then trigger another one every 45-90 seconds randomly
        const interval = setInterval(() => {
            if (Math.random() > 0.5) triggerSimulation();
        }, 45000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
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

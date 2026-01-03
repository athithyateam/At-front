import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { listPosts } from "../api/posts";
import { listItineraries } from "../api/itineraries";

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

    // REAL-TIME POLLING: Check for new content from other users
    useEffect(() => {
        if (!user) return;

        let lastPostId = null;
        let lastPlanId = null;
        let isFirstRun = true;

        const checkNewContent = async () => {
            try {
                // Check Posts
                const postsRes = await listPosts({ limit: 1 });
                if (postsRes?.experiences?.length > 0) {
                    const latestPost = postsRes.experiences[0];
                    if (!isFirstRun && lastPostId && latestPost._id !== lastPostId) {
                        // Only notify if author is NOT me
                        if (latestPost.user?._id !== user._id) {
                            addNotification({
                                title: "New Experience Posted",
                                message: `${latestPost.user?.firstname} posted: "${latestPost.title}"`,
                                type: "info"
                            });
                        }
                    }
                    lastPostId = latestPost._id;
                }

                // Check Plans
                const plansRes = await listItineraries({ limit: 1 });
                if (plansRes?.itineraries?.length > 0) {
                    const latestPlan = plansRes.itineraries[0];
                    if (!isFirstRun && lastPlanId && latestPlan._id !== lastPlanId) {
                        if (latestPlan.user?._id !== user._id) {
                            addNotification({
                                title: "New Plan Added",
                                message: `${latestPlan.user?.firstname} added a plan: "${latestPlan.title}"`,
                                type: "info"
                            });
                        }
                    }
                    lastPlanId = latestPlan._id;
                }

                isFirstRun = false;

            } catch (err) {
                console.error("Notification polling failed", err);
            }
        };

        // Initial check
        checkNewContent();

        // Poll every 30 seconds
        const interval = setInterval(checkNewContent, 30000);
        return () => clearInterval(interval);
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

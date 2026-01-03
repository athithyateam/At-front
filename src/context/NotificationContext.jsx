import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { listPosts } from "../api/posts";
import { listItineraries } from "../api/itineraries";
import { listServices } from "../api/services";
import * as notifApi from "../api/notifications";

const NotificationContext = createContext();

export function useNotifications() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const token = localStorage.getItem("auth_token");

    // Fetch Notifications from Backend (No more local storage)
    const fetchNotifications = async () => {
        if (!user) return;
        try {
            const res = await notifApi.getNotifications({ limit: 50 }, { token });
            if (res.success) {
                setNotifications(res.notifications);
                setUnreadCount(res.unreadCount);
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        }
    };

    // Initial Load
    useEffect(() => {
        if (user) fetchNotifications();
    }, [user]);

    // Add a notification (Saved directly to DB)
    const addNotification = async ({ title, message, type = "info", link = null }) => {
        // Optimistic UI update
        const tempId = Date.now();
        const newNotif = {
            _id: tempId,
            recipient: user?._id,
            title,
            message,
            type,
            link,
            read: false,
            createdAt: new Date().toISOString(),
        };
        setNotifications((prev) => [newNotif, ...prev]);
        setUnreadCount((prev) => prev + 1);

        try {
            await notifApi.createNotification(
                { title, message, type, link },
                { token }
            );
            fetchNotifications(); // Sync with real DB data
        } catch (error) {
            console.error("Failed to save notification", error);
        }
    };

    const markAsRead = async (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));

        try {
            await notifApi.markAsRead(id, { token });
        } catch (error) {
            console.error("Failed to mark read", error);
            fetchNotifications();
        }
    };

    const markAllAsRead = async () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setUnreadCount(0);

        try {
            await notifApi.markAllRead({ token });
        } catch (error) {
            console.error("Failed to mark all read", error);
            fetchNotifications();
        }
    };

    const clearNotifications = async () => {
        setNotifications([]);
        setUnreadCount(0);
        try {
            await notifApi.clearAllNotifications({ token });
        } catch (error) {
            console.error("Failed to clear", error);
            fetchNotifications();
        }
    };

    // REAL-TIME POLLING: Check for new content from other users
    useEffect(() => {
        if (!user) return;

        let lastPostId = null;
        let lastPlanId = null;
        let lastServiceId = null;
        let isFirstRun = true;

        const checkNewContent = async () => {
            try {
                // Check Posts
                const postsRes = await listPosts({ limit: 1 });
                if (postsRes?.experiences?.length > 0) {
                    const latestPost = postsRes.experiences[0];
                    if (!isFirstRun && lastPostId && latestPost._id !== lastPostId) {
                        if (latestPost.user?._id !== user._id) {
                            addNotification({
                                title: "New Experience Posted",
                                message: `${latestPost.user?.firstname} posted: "${latestPost.title}"`,
                                type: "info",
                                link: "/connect?tab=posts"
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
                                type: "info",
                                link: "/connect?tab=plans"
                            });
                        }
                    }
                    lastPlanId = latestPlan._id;
                }

                // Check Services
                const servicesRes = await listServices({ limit: 1 });
                if (servicesRes?.services?.length > 0) {
                    const latestService = servicesRes.services[0];
                    if (!isFirstRun && lastServiceId && latestService._id !== lastServiceId) {
                        if (latestService.user?._id !== user._id) {
                            addNotification({
                                title: "New Service Offered",
                                message: `${latestService.user?.firstname} added a service: "${latestService.title}"`,
                                type: "info",
                                link: `/profile/${latestService.user?._id}`
                            });
                        }
                    }
                    lastServiceId = latestService._id;
                }

                isFirstRun = false;
            } catch (err) {
                console.error("Polling failed", err);
            }
        };

        checkNewContent();
        fetchNotifications();

        const interval = setInterval(() => {
            checkNewContent();
            fetchNotifications();
        }, 30000); // 30s poll

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

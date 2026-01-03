import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { listPosts } from "../api/posts";
import { listItineraries } from "../api/itineraries";
import { listServices } from "../api/services";

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
        let lastServiceId = null;
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
                console.error("Notification polling failed", err);
            }
        };

        // Initial check
        checkNewContent();

        // Poll every 30 seconds
        const interval = setInterval(checkNewContent, 30000);
        return () => clearInterval(interval);
    }, [user]);

    // REAL-TIME REACTION POLLING (Local Storage Simulation for Cross-User)
    useEffect(() => {
        if (!user) return;

        let lastSnapshot = localStorage.getItem("ath_global_reactions_posts");

        const checkReactions = async () => {
            const currentRaw = localStorage.getItem("ath_global_reactions_posts");
            if (currentRaw === lastSnapshot) return;

            // Something changed!
            const current = currentRaw ? JSON.parse(currentRaw) : {};
            const previous = lastSnapshot ? JSON.parse(lastSnapshot) : {};

            try {
                const res = await listPosts();
                const myPosts = res.experiences.filter(p => p.user?._id === user._id);
                const myPostIds = new Set(myPosts.map(p => p._id));

                // Check for new reactions on MY posts
                Object.keys(current).forEach(postId => {
                    if (!myPostIds.has(postId)) return;

                    const newReactions = current[postId] || {};
                    const oldReactions = previous[postId] || {};

                    // Check for added user IDs
                    Object.keys(newReactions).forEach(reactorId => {
                        // If I reacted to myself, ignore
                        if (reactorId === user._id) return;

                        // If this specific reaction didn't exist before
                        if (!oldReactions[reactorId]) {
                            const reactionData = newReactions[reactorId];
                            const emoji = typeof reactionData === "string" ? reactionData : reactionData.emoji;
                            const reactorName = typeof reactionData === "string" ? "Someone" : reactionData.name;

                            const postTitle = myPosts.find(p => p._id === postId)?.title || "your post";

                            addNotification({
                                title: "New Reaction",
                                message: `${reactorName} reacted with ${emoji} to "${postTitle}"`,
                                type: "success",
                                link: "/connect?tab=posts"
                            });
                        }
                    });
                });

            } catch (e) {
                console.error("Reaction poll error", e);
            }

            lastSnapshot = currentRaw;
        };

        const interval = setInterval(checkReactions, 3000); // Check every 3 seconds for fast feedback
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

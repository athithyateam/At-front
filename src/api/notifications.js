import { axiosInstance } from "./posts"; // Reuse instance
import { ENDPOINTS } from "./allApi";

export async function getNotifications(params = {}, { token } = {}) {
    try {
        const res = await axiosInstance.get(ENDPOINTS.NOTIFICATIONS, {
            params,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return res.data;
    } catch (err) {
        throw err?.response?.data || err;
    }
}

export async function markAsRead(id, { token } = {}) {
    try {
        const res = await axiosInstance.put(ENDPOINTS.MARK_READ(id), {}, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return res.data;
    } catch (err) {
        throw err?.response?.data || err;
    }
}

export async function markAllRead({ token } = {}) {
    try {
        const res = await axiosInstance.put(ENDPOINTS.MARK_ALL_READ, {}, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return res.data;
    } catch (err) {
        throw err?.response?.data || err;
    }
}

export async function clearAllNotifications({ token } = {}) {
    try {
        const res = await axiosInstance.delete(ENDPOINTS.CLEAR_ALL_NOTIFS, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return res.data;
    } catch (err) {
        throw err?.response?.data || err;
    }
}

export async function createNotification(data, { token } = {}) {
    try {
        const res = await axiosInstance.post(ENDPOINTS.NOTIFICATIONS, data, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return res.data;
    } catch (err) {
        throw err?.response?.data || err;
    }
}

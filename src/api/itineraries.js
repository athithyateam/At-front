// src/api/itineraries.js
import { axiosInstance } from "./posts";
import { ENDPOINTS } from "./allApi";

const ENDPOINT = ENDPOINTS.ITINERARIES;

export async function createItinerary(
  formData,
  { onUploadProgress, token, signal } = {}
) {
  try {
    const config = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        // do not set Content-Type when sending FormData; axios sets it automatically
      },
      onUploadProgress: (evt) => {
        // evt might not have total in some envs
        if (!evt?.total) return;
        const percent = Math.round((evt.loaded * 100) / evt.total);
        if (typeof onUploadProgress === "function") onUploadProgress(percent);
      },
      signal,
    };

    const res = await axiosInstance.post(ENDPOINT, formData, config);
    return res.data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Network error";
    const status = err?.response?.status || null;
    console.error("createItinerary error:", { status, message, original: err });
    throw { success: false, message, status, original: err };
  }
}

/**
 * getItinerary(id, { token } = {})
 */
export async function getItinerary(id, { token } = {}) {
  try {
    const res = await axiosInstance.get(`${ENDPOINT}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch itinerary";
    console.error("getItinerary error:", message, err);
    throw { success: false, message, original: err };
  }
}

/**
 * listItineraries(params = {}, { token } = {})
 * params will be sent as query params (page, limit, q, filter etc.)
 */
export async function listItineraries(params = {}, { token } = {}) {
  try {
    const res = await axiosInstance.get(ENDPOINT, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to list itineraries";
    console.error("listItineraries error:", message, err);
    throw { success: false, message, original: err };
  }
}

export async function updateItinerary(id, formData, { token, onUploadProgress } = {}) {
  try {
    const config = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      onUploadProgress: (evt) => {
        if (!evt?.total) return;
        const percent = Math.round((evt.loaded * 100) / evt.total);
        if (typeof onUploadProgress === "function") onUploadProgress(percent);
      },
    };
    const res = await axiosInstance.put(`${ENDPOINT}/${id}`, formData, config);
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || err?.message || "Failed to update itinerary";
    console.error("updateItinerary error:", message, err);
    throw { success: false, message, original: err };
  }
}

export async function reactToItinerary(id, emoji, { token } = {}) {
  try {
    const res = await axiosInstance.put(ENDPOINTS.REACT_ITINERARY(id), { emoji }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || err?.message || "Failed to react to itinerary";
    console.error("reactToItinerary error:", message, err);
    throw { success: false, message, original: err };
  }
}

export async function deleteItinerary(id, { token } = {}) {
  try {
    const res = await axiosInstance.delete(ENDPOINTS.DELETE_ITINERARY(id), {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || err?.message || "Failed to delete itinerary";
    console.error("deleteItinerary error:", message, err);
    throw { success: false, message, original: err };
  }
}

export default {
  createItinerary,
  getItinerary,
  listItineraries,
  updateItinerary,
  reactToItinerary,
  deleteItinerary,
};

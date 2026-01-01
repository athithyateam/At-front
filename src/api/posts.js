// src/api/posts.js
import axios from "axios";
import { ENDPOINTS, API_BASE } from "./allApi"; // API_BASE optional


export const axiosInstance = axios.create({
  timeout: 30_000, // 30s sensible default
});

export async function createPost(formData, { onUploadProgress, token, signal } = {}) {
  try {
    const config = {
      headers: {
        // axios will set Content-Type including boundary when sending FormData
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      onUploadProgress: (evt) => {
        if (!evt.total) return;
        const percent = Math.round((evt.loaded * 100) / evt.total);
        if (typeof onUploadProgress === "function") onUploadProgress(percent);
      },
      signal, // supports cancellation in axios v1+ (browser AbortController)
    };

    const res = await axiosInstance.post(ENDPOINTS.POSTS, formData, config);
    return res.data; // keep same shape as before
  } catch (err) {
    // Normalize error for caller
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Network error";
    const status = err?.response?.status || null;
    const normalized = { success: false, message, status, original: err };
    // Optionally attach to console for debugging
    console.error("createPost error:", normalized);
    // Throw so UI can catch and show appropriate message
    throw normalized;
  }
}

/** convenience helpers */
export async function getPost(id, { token } = {}) {
  try {
    const res = await axiosInstance.get(ENDPOINTS.GET_POST(id), {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || err?.message || "Failed to fetch post";
    console.error("getPost error:", message, err);
    throw { success: false, message, original: err };
  }
}

export async function listPosts(params = {}, { token } = {}) {
  try {
    const res = await axiosInstance.get(ENDPOINTS.POSTS, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || err?.message || "Failed to list posts";
    console.error("listPosts error:", message, err);
    throw { success: false, message, original: err };
  }
}

export default {
  axiosInstance,
  createPost,
  getPost,
  listPosts,
};

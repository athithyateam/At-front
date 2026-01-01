// src/api/services.js
import { axiosInstance } from "./posts";
import { ENDPOINTS } from "./allApi";

/**
 * createService - Post a new service to the dedicated services endpoint
 * @param {FormData} formData - Form data containing service details
 * @param {Object} options - Configuration options
 * @param {Function} options.onUploadProgress - Progress callback
 * @param {string} options.token - Auth token
 * @param {AbortSignal} options.signal - Abort signal for cancellation
 * @returns {Promise} Response data
 */
export async function createService(formData, { onUploadProgress, token, signal } = {}) {
  try {
    const config = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        // axios automatically sets Content-Type for FormData
      },
      onUploadProgress: (evt) => {
        if (!evt?.total) return;
        const percent = Math.round((evt.loaded * 100) / evt.total);
        if (typeof onUploadProgress === "function") onUploadProgress(percent);
      },
      signal,
    };

    const res = await axiosInstance.post(ENDPOINTS.POST_SERVICE, formData, config);
    return res.data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Network error creating service";
    const status = err?.response?.status || null;
    console.error("createService error:", { status, message, original: err });
    throw { success: false, message, status, original: err };
  }
}

/**
 * getService - Get a specific service by ID
 * @param {string} id - Service ID
 * @param {Object} options - Configuration options
 * @param {string} options.token - Auth token
 * @returns {Promise} Service data
 */
export async function getService(id, { token } = {}) {
  try {
    const res = await axiosInstance.get(ENDPOINTS.GET_SERVICE(id), {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch service";
    console.error("getService error:", message, err);
    throw { success: false, message, original: err };
  }
}

/**
 * listServices - Get all services with optional filtering
 * @param {Object} params - Query parameters (page, limit, categories, etc.)
 * @param {Object} options - Configuration options
 * @param {string} options.token - Auth token
 * @returns {Promise} Services list
 */
export async function listServices(params = {}, { token } = {}) {
  try {
    const res = await axiosInstance.get(ENDPOINTS.ALL_SERVICES, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to list services";
    console.error("listServices error:", message, err);
    throw { success: false, message, original: err };
  }
}

/**
 * getUserServices - Get services created by a specific user
 * @param {string} userId - User ID
 * @param {Object} options - Configuration options
 * @param {string} options.token - Auth token
 * @returns {Promise} User's services
 */
export async function getUserServices(userId, { token } = {}) {
  try {
    const res = await axiosInstance.get(ENDPOINTS.USER_SERVICE(userId), {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch user services";
    console.error("getUserServices error:", message, err);
    throw { success: false, message, original: err };
  }
}

/**
 * deleteService - Delete a service by ID
 * @param {string} id - Service ID
 * @param {Object} options - Configuration options
 * @param {string} options.token - Auth token
 * @returns {Promise} Deletion response
 */
export async function deleteService(id, { token } = {}) {
  try {
    const res = await axiosInstance.delete(ENDPOINTS.DELETE_SERVICE(id), {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to delete service";
    console.error("deleteService error:", message, err);
    throw { success: false, message, original: err };
  }
}

export default {
  createService,
  getService,
  listServices,
  getUserServices,
  deleteService,
};
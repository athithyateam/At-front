export const API_BASE = import.meta.env.VITE_WEB_API || "http://localhost:3000";

export const ENDPOINTS = {
  // experience (momentos/posts)
  POSTS: `${API_BASE}/api/posts/experiences`,
  GET_POST: (id) => `${API_BASE}/api/posts/experiences/${id}`,
  DELETE_POST: (id) => `${API_BASE}/api/posts/experiences/${id}`,
  USER_POST: (userId) => `${API_BASE}/api/posts/experiences/user/${userId}`,

  // itineraries (plans)
  ITINERARIES: `${API_BASE}/api/itineraries`,
  POST_ITINERARIES: `${API_BASE}/api/itineraries`,
  GET_ITINERARY: (id) => `${API_BASE}/api/itineraries/${id}`,
  USER_ITINERARIES: (userId) => `${API_BASE}/api/itineraries/${userId}`,
  DELETE_ITINERARY: (id) => `${API_BASE}/api/itineraries/${id}`,

  // services
  POST_SERVICE: `${API_BASE}/api/posts/services`,
  ALL_SERVICES: `${API_BASE}/api/posts/services`,
  DELETE_SERVICE: (id) => `${API_BASE}/api/posts/services/${id}`,
  GET_SERVICE: (id) => `${API_BASE}/api/posts/services/${id}`,
  USER_SERVICE: (userId) => `${API_BASE}/api/posts/services/user/${userId}`,

  // featured treks
  GET_FEATURED_TREKS: (limit = 10) =>
    `${API_BASE}/api/posts/featured/treks?limit=${limit}`,

  // nearby treks (geo-based)
  GET_NEARBY_TREKS: ({ latitude, longitude }) =>
    `${API_BASE}/api/posts/nearby/treks?latitude=${latitude}&longitude=${longitude}`,

  // top rated treks
  GET_TOPRATED_TREKS: `${API_BASE}/api/posts/top-rated/treks`,

  // top rated hosts
  GET_TOPRATED_HOSTS: `${API_BASE}/api/users/top-rated/hosts`,
};

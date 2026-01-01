import axios from "axios";

const API_BASE = import.meta.env.VITE_WEB_API;

export async function getProfileByIdApi(userId) {
  const token = localStorage.getItem("auth_token");

  const res = await axios.get(
    `${API_BASE}/api/users/profile/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data; // { success, data }
}

export async function updateUserLocationApi(locationData) {
  const token = localStorage.getItem("auth_token");

  const res = await axios.put(
    `${API_BASE}/api/users/location`,
    locationData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data; // { success, message, data }
}

export async function getUserLocationApi() {
  const token = localStorage.getItem("auth_token");

  const res = await axios.get(
    `${API_BASE}/users/location`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data; // { success, data }
}

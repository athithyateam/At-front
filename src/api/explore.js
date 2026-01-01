import { axiosInstance } from "./posts";
import { ENDPOINTS } from "./allApi";

export async function getFeaturedTreks(limit = 10) {
  const res = await axiosInstance.get(ENDPOINTS.GET_FEATURED_TREKS(limit));
  return res.data;
}

export async function getTopRatedTreks() {
  const res = await axiosInstance.get(ENDPOINTS.GET_TOPRATED_TREKS);
  return res.data;
}

export async function getTopRatedHosts() {
  const res = await axiosInstance.get(ENDPOINTS.GET_TOPRATED_HOSTS);
  return res.data;
}

export async function getNearbyTreks({ latitude, longitude }) {
  const res = await axiosInstance.get(
    ENDPOINTS.GET_NEARBY_TREKS({ latitude, longitude })
  );
  return res.data;
}

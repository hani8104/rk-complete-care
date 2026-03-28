import axios from "axios";

// ✅ AUTO SWITCH (LOCAL + LIVE)
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// ✅ TOKEN INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ SAFE RESPONSE HANDLER
const safeData = (res) => {
  console.log("API DATA:", res.data);
  return res.data;
};

// ✅ APIs
export const getDoctors = () => api.get("/doctors").then(safeData);
export const getBanners = () => api.get("/banners").then(safeData);
export const getTestimonials = () => api.get("/testimonials").then(safeData);
export const getPatientStories = () => api.get("/patient-stories").then(safeData);
export const getClinicInfo = () => api.get("/clinic-info").then(safeData);
export const getClinicPosters = () => api.get("/clinic-posters").then(safeData);

export default api;
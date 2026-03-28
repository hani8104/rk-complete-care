import axios from "axios";

// ✅ IMPORTANT: direct backend URL use karo

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/api";
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000, // optional
});

// ✅ Add this interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ APIs
export const getDoctors = () => api.get("/doctors").then(res => res.data);
export const getBanners = () => api.get("/banners").then(res => res.data);
export const getTestimonials = () => api.get("/testimonials").then(res => res.data);
export const getPatientStories = () => api.get("/patient-stories").then(res => res.data);
export const getClinicInfo = () => api.get("/clinic-info").then(res => res.data);
export const getClinicPosters = () => api.get("/clinic-posters").then(res => res.data);

// ✅ export api instance
export default api;
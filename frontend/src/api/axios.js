// 🔵 NEW FILE: src/api/axios.js
import axios from "axios";

// 🟢 Centralized Axios instance to manage all requests
const api = axios.create({
  baseURL: "http://localhost:3000/api", // backend root URL
  withCredentials: true, // send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟢 Optional interceptor: Automatically add token if stored
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🟢 Optional interceptor: Handle API/global errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("❌ API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://event-listing-site.vercel.app/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

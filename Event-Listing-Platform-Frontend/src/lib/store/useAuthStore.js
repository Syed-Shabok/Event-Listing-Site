import { create } from "zustand";
import axiosInstance from "../axiosInstance";

const useAuthStore = create((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,

  token: localStorage.getItem("user-token"),
  isAuthenticated: !!localStorage.getItem("user-token"),
  loading: false,
  error: null,

  // LOGIN
  login: async (credentials) => {
    try {
      set({ loading: true, error: null });

      const res = await axiosInstance.post("/login", credentials);
      const { token, user } = res.data;

      localStorage.setItem("user-token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
        loading: false,
      });

      return res.data.success;
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Login failed",
      });
      throw error;
    }
  },

  // REGISTER
  register: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await axiosInstance.post("/register", data);

      set({ loading: false });
      return res.data.success;
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Registration failed",
      });
      throw error;
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      set({ loading: true });
      await axiosInstance.post("/logout");
    } finally {
      localStorage.removeItem("user-token");
      localStorage.removeItem("user");

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));

export default useAuthStore;

import axios from "axios";
import { create } from "zustand";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async (userCredObj) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post("/common-api/login", userCredObj);
      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.log("err is ", err);
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed",
      });
    }
  },
  logout: async () => {
    try {
      set({ loading: true });
      await axios.post("/common-api/logout");
      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Logout failed",
      });
    }
  },
}));
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const adminAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingUp: false,
  isUpdateProfile: false,

  // ✅ Check logged in admin (called on page load)
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/admin/check", {
        withCredentials: true,
      });
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ Signup admin
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/admin/signup", data, {
        withCredentials: true,
      });
      set({ authUser: res.data });

      toast.success("Account created successfully!", {
        duration: 5000, // 5 seconds
        style: {
          border: "1px solid #4ade80",
          padding: "12px",
          color: "#22c55e",
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#fff",
        },
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ✅ Login admin (fixed withCredentials)
  login: async (data) => {
    set({ isLoggingUp: true });
    try {
      const res = await axiosInstance.post("/admin/login", data, {
        withCredentials: true,
      });
      set({ authUser: res.data });
    //   toast.success("Login successfully!");
      toast.success("Login successfully!", {
        duration: 3000, // 5 seconds
        style: {
          border: "1px solid #4ade80",
          padding: "12px",
          color: "#22c55e",
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#fff",
        },
      });
      
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed",{
       duration:3000
      });
    } finally {
      set({ isLoggingUp: false });
    }
  },

  // ✅ Logout admin
  logout: async () => {
    try {
      await axiosInstance.get("/admin/logout", { withCredentials: true });
      set({ authUser: null });
    //   toast.success("Logged out successfully");
      toast.success("Logged out successfully!", {
        duration: 3000, // 5 seconds
        style: {
          border: "1px solid #4ade80",
          padding: "12px",
          color: "#22c55e",
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#fff",
        },
      });
    } catch (error) {
      toast.error("Error logging out",{
        duration:3000
      });
      console.log("Logout error:", error);
    }
  },
}));

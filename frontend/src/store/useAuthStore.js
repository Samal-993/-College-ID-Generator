// src/store/useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isSubmittingDetails: false,

    // 🔹 Check if user is authenticated
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/student/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in authCheck:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // 🔹 Signup user
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/student/signup", data, {
                withCredentials: true,
            });
            set({ authUser: res.data });
            toast.success("Account created successfully!");
        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error?.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    // 🔹 Login user
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/student/login", data);
            set({ authUser: res.data });
            toast.success("Login successfully!");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error?.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // 🔹 Logout user
    logout: async () => {
        try {
            await axiosInstance.get("/student/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Error logging out");
            console.log("Logout error:", error);
        }
    },

    // 🔹 NEW: Submit student details (ID card application)
    submitDetails: async (formData) => {
        set({ isSubmittingDetails: true });
        try {
            const res = await axiosInstance.post("/details", formData, {
                withCredentials: true,
            });
            toast.success("Application submitted successfully!");
            return res.data;
        } catch (error) {
            console.error("Submit details error:", error);
            toast.error(error?.response?.data?.error || "Submission failed");
            throw error;
        } finally {
            set({ isSubmittingDetails: false });
        }
    },
}));
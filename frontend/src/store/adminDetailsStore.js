// src/store/adminDetailsStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const adminDetailsStore = create((set) => ({
    students: [],
    isLoading: false,
    selectedStudent: null,

    // 🔹 Fetch all student details
    fetchAllStudents: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/details", {
                withCredentials: true,
            });
            set({ students: res.data });
        } catch (error) {
            console.error("Error fetching students:", error);
            toast.error("Failed to fetch student details",{
                duration:3000
            });
        } finally {
            set({ isLoading: false });
        }
    },

    // 🔹 Approve student
    approveStudent: async (id) => {
        try {
            const res = await axiosInstance.put(
                `/details/${id}/status`,
                { status: "Approved" },
                { withCredentials: true }
            );
            toast.success("Student approved!", {
                duration:3000
            });
            
            // Update local state
            set((state) => ({
                students: state.students.map((s) =>
                    s._id === id ? { ...s, status: "Approved" } : s
                ),
            }));
        } catch (error) {
            console.error("Error approving student:", error);
            toast.error("Failed to approve student",{
                duration:3000
            });
        }
    },

    // 🔹 Reject student
    rejectStudent: async (id) => {
        try {
            const res = await axiosInstance.put(
                `/details/${id}/status`,
                { status: "Rejected" },
                { withCredentials: true }
            );
            toast.success("Student rejected!",{
                duration:3000
            });
            
            // Update local state
            set((state) => ({
                students: state.students.map((s) =>
                    s._id === id ? { ...s, status: "Rejected" } : s
                ),
            }));
        } catch (error) {
            console.error("Error rejecting student:", error);
            toast.error("Failed to reject student",{
                duration:3000
            });
        }
    },

    // 🔹 Set selected student for viewing
    setSelectedStudent: (student) => set({ selectedStudent: student }),
}));
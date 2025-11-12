import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ Added Routes + Route
import AdminNavbar from "../Admin/AdminNavbar";
import AdminSidebar from "../Admin/AdminSidebar";
import { adminAuthStore } from "../store/adminAuthStore";
import Manage_Admin from "./Manage_Admin";
// ✅ Import your pages/components
import AdminDashboard from "./AdminDashboard ";
import AdminStudentsPage from "../Page/AdminStudentsPage ";
import StudentTable from "./StudentTable"; // ✅ The one that shows full student list (your long table)

const AdminLayout = () => {
  const { authUser, isCheckingAuth, checkAuth } = adminAuthStore();

  useEffect(() => {
    // Only check auth if not already checked
    if (isCheckingAuth) {
      checkAuth();
    }
  }, []);

  // Show loading while checking
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0e1a2b] to-[#04070f] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-slate-300">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!authUser) {
    return <Navigate to="/adminLogin" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0e1a2b] to-[#04070f] text-white">
      {/* Top navbar */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <AdminNavbar />
      </div>

      <div className="pt-[72px] flex">
        {/* Sidebar */}
        <div className="fixed left-0 top-[72px] bottom-0 z-30 group">
          <div className="w-20 group-hover:w-56 transition-all duration-300 ease-in-out h-full">
            <AdminSidebar />
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 ml-20 group-hover:ml-56 transition-all duration-300 ease-in-out p-6 min-h-[calc(100vh-72px)]">
          <div className="bg-[#111827]/30 backdrop-blur-md border border-gray-700 rounded-xl p-6 min-h-[70vh]">
            {/* ✅ Internal routes for admin section */}
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudentsPage />} />
              <Route path="departments" element={<StudentTable />} /> 
              <Route path="manage-admin" element={<Manage_Admin/>} /> 
           
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

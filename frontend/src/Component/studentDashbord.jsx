import React, { useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardWelcome from "./DashboardWelcome";
import { useAuthStore } from "../store/useAuthStore";

const StudentDashboard = () => {
  const location = useLocation();
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

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
          <p className="mt-4 text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#111827] via-[#0e1a2b] to-[#04070f] text-white">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-[#111827] via-[#0e1a2b] to-[#04070f]">
        <Navbar />
      </div>

      {/* Content Area with Sidebar */}
      <div className="flex pt-[76px]">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-[76px] h-[calc(100vh-76px)] overflow-y-auto">
          <Sidebar />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 ml-[16%] p-6 overflow-y-auto h-[calc(100vh-76px)]">
          <div className="bg-[#111827]/40 backdrop-blur-md border border-gray-700 rounded-xl p-6 min-h-[70vh] shadow-lg relative">
            {/* If on base route, show welcome screen */}
            {location.pathname === "/dashbord" ? (
              <DashboardWelcome studentName={authUser?.name || "Student"} />
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import scanAnim from "../assect/ID Card - Profile Card.json";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import { adminAuthStore } from '../store/adminAuthStore';

const LandingPage = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const { authUser: studentUser, isCheckingAuth: isCheckingStudent } = useAuthStore();
  const { authUser: adminUser, isCheckingAuth: isCheckingAdmin } = adminAuthStore();

  const toggleMenu = (type) => {
    setOpenMenu(openMenu === type ? null : type);
  };

  // Redirect if already logged in
  useEffect(() => {
    if (!isCheckingStudent && studentUser) {
      navigate("/dashbord");
    } else if (!isCheckingAdmin && adminUser) {
      navigate("/admin");
    }
  }, [studentUser, adminUser, isCheckingStudent, isCheckingAdmin, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#111827] via-[#0e1a2b] to-[#04070f] text-white px-6 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          className="w-full h-full object-cover opacity-50"
          src="/bn1.png"
          alt=""
        />
      </div>

      {/* Soft Glow Background Shapes */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/25 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/30 blur-[160px] rounded-full"></div>

      {/* Navbar */}
      <div className="w-full flex items-center justify-between relative py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 bg-white h-12">
            <img src="/giet-removebg-preview.png" alt="" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">College ID Generator</h1>
            <p className="text-xs text-gray-300 -mt-1">Smart ID Card Management System</p>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Admin Button */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("admin")}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
            >
              Admin
            </button>

            {openMenu === "admin" && (
              <div className="absolute mt-3 right-0 w-40 bg-white text-gray-800 rounded-lg shadow-lg p-2 space-y-2 z-50">
                <button
                  onClick={() => {
                    setOpenMenu(null);
                    navigate("/adminLogin");
                  }}
                  className="w-full px-4 py-2 rounded-md hover:bg-gray-300 text-left"
                >
                  Login
                </button>
              </div>
            )}
          </div>

          {/* Student Button */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("student")}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
            >
              Student
            </button>

            {openMenu === "student" && (
              <div className="absolute mt-3 right-0 w-40 bg-white text-gray-800 rounded-lg shadow-lg p-2 space-y-2 z-50">
                <button
                  onClick={() => {
                    setOpenMenu(null);
                    navigate("/login");
                  }}
                  className="w-full px-4 py-2 rounded-md hover:bg-gray-100 text-left"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setOpenMenu(null);
                    navigate("/register");
                  }}
                  className="w-full px-4 py-2 rounded-md hover:bg-gray-100 text-left"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-around relative top-40">
        {/* Left Glass Card */}
        <div className="w-[30%] backdrop-blur-md relative left-26">
          <h2 className="headfont w-[500px] text-6xl font-bold mb-3">
            Generate Digital ID Cards Easily
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Create, preview and download official student identity cards in seconds.
            Secure, fast and user-friendly for both admin and students.
          </p>
        </div>

        {/* Right Lottie Animation */}
        <div className="w-64 h-64 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
          <Lottie animationData={scanAnim} loop={true} />
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-400 text-xs mt-80 pt-6">
        © 2025 GIET. All Rights Reserved.
      </p>
    </div>
  );
};

export default LandingPage;
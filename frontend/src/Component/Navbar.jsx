import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const navigate = useNavigate();

   const { logout } = useAuthStore();

   const handleLogout = async () => {
  await logout();
  navigate("/"); // ✅ Redirect after logout
};


  return (
    <header className="w-full flex items-center justify-between py-4 px-6 border-b border-white/10">
      {/* Left - Logo */}
      <div className="flex items-center gap-4">
        
        <div className="w-12 bg-white   h-12 ">
                    <img src="/giet-removebg-preview.png" alt="" />
                  </div>
        <div>
          <div className="text-2xl font-bold tracking-wide text-slate-200">
            GIET
          </div>
          <div className="text-xs text-slate-400">University</div>
        </div>
      </div>

      {/* Center - Title */}
      <div className="text-center">
        <div className="text-2xl font-semibold tracking-tight text-slate-300">
          Student ID Card System
        </div>
        <div className="text-xs text-slate-500 mt-1">
          Digital Identity Management
        </div>
      </div>
        {/* Right - Logout */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="px-6 py-2.5 bg-white text-black rounded-lg font-semibold tracking-wide hover:bg-gray-200 transition-all duration-200 hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;


  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { adminAuthStore } from "../store/adminAuthStore";
  import { ChevronDown, LogOut } from "lucide-react";

  const AdminNavbar = () => {
    const navigate = useNavigate();
    const { authUser, logout } = adminAuthStore(); // 👈 fetch logged-in admin info
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
      await logout();
      navigate("/");
    };

    return (
      <header className="w-full flex items-center justify-between py-4 px-6 border-b border-white/10 bg-gradient-to-br from-[#111827] via-[#0e1a2b] to-[#04070f]">
        {/* Left - Logo */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center p-1 bg-white/5">
            <img src="/giet-removebg-preview.png" alt="logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-wide text-slate-200">GIET</div>
            <div className="text-xs text-slate-400">University</div>
          </div>
        </div>

        {/* Center - Title */}
        <div className="text-center">
          <div className="text-2xl font-semibold tracking-tight text-slate-300">Admin Control Panel</div>
          <div className="text-xs text-slate-500 mt-1">Digital Identity Management</div>
        </div>

        {/* Right - Avatar + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full text-slate-200 hover:bg-white/10 transition"
          >
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-lg font-semibold">
              {authUser?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <ChevronDown size={16} />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-gray-700 rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-semibold text-slate-200">
                  {authUser?.name || "Admin User"}
                </p>
                <p className="text-xs text-slate-400">
                  {authUser?.role || "Super Admin"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </header>
    );
  };

  export default AdminNavbar;

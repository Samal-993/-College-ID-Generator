import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkBase =
    "block text-left px-5 py-4 rounded-xl font-medium transition-all duration-200 flex items-center gap-3";

  const items = [
    { to: "apply", label: "Apply ID", desc: "Apply for new ID", icon: "📝" },
    { to: "status", label: "Check Status", desc: "Track application", icon: "📊" },
    { to: "virtual", label: "Virtual ID", desc: "View virtual card", icon: "💳" },
  ];

  return (
    <aside className="w-[16%] h-screen p-4 bg-[#1f2937]/60 backdrop-blur-md border-r border-gray-700 fixed top-[76px] left-0 overflow-y-auto">
      {/* Welcome Section */}
      <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
          Student Portal
        </div>
        <div className="text-base font-bold text-white">Welcome, Student</div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-3">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                  : "bg-white/5 text-slate-200 hover:bg-white/10 hover:translate-x-1"
              }`
            }
          >
            <span className="text-2xl">{it.icon}</span>
            <div className="flex-1">
              <div className="text-sm font-semibold tracking-wide">{it.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{it.desc}</div>
            </div>
          </NavLink>
        ))}
      </nav>

      {/* Help Tip */}
      <div className="mt-8 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
        <div className="text-xs font-medium text-blue-400 mb-1">💡 Quick Tip</div>
        <div className="text-xs text-slate-400 leading-relaxed">
          Apply before contacting admin for faster approval.
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

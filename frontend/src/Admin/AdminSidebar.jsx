import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, ListChecks } from "lucide-react";

const menu = [
  { name: "Dashboard", to: "/admin", icon: <Home size={18} />, end: true },
  { name: "Students", to: "/admin/students", icon: <Users size={18} /> },
  { name: "Departments", to: "/admin/manage-admin", icon: <ListChecks size={18} /> },
];

const AdminSidebar = () => {
  return (
    // group = enables hover expansion
    <aside
      className="
        group bg-gradient-to-b from-[#0f1724] to-[#071028] border-r border-gray-800 text-slate-200
        h-[calc(100vh-72px)] 
        w-20 hover:w-64 transition-[width] duration-300 ease-out 
        flex flex-col flex-shrink-0
      "
    >
      {/* Top Logo */}
      <div className="flex items-center gap-3 px-3 py-3 mb-4">
        <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center text-sm font-bold">
          GIET
        </div>
        {/* Hide until expanded, and prevent overflow */}
        <div className="hidden group-hover:block min-w-0">
          <div className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            Admin Panel
          </div>
          <div className="text-xs text-slate-400 whitespace-nowrap overflow-hidden text-ellipsis">
            Super Admin
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 px-2">
        {menu.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            end={m.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 transition-all text-sm
               ${isActive ? "bg-[#1f2937] text-white border-l-4 border-blue-600" : "text-slate-300 hover:bg-white/5"}`
            }
          >
            <div className="w-6 shrink-0">{m.icon}</div>
            {/* label only when expanded; keep it from pushing outside */}
            <span className="hidden group-hover:block min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
              {m.name}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-slate-500 text-center border-t border-gray-800 pt-4 px-2">
        <span className="hidden group-hover:inline-block whitespace-nowrap overflow-hidden text-ellipsis">
          © 2025 GIET
        </span>
      </div>
    </aside>
  );
};

export default AdminSidebar;

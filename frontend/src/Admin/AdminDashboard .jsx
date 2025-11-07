import React, { useEffect } from "react";
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { adminDetailsStore } from "../store/adminDetailsStore";

const AdminDashboard = () => {
  // ✅ Extract Zustand store data safely
  const { students = [], fetchAllStudents, refreshStudents, isLoading } =
    adminDetailsStore();

  // ✅ Fetch on mount
  useEffect(() => {
    fetchAllStudents?.();
  }, [fetchAllStudents]);

  // ✅ Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllStudents?.();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [fetchAllStudents]);

  // ✅ Use optional chaining and fallback values to prevent crash
  const totalStudents = students?.length || 0;
  const approved =
    students?.filter((s) => s.status === "Approved")?.length || 0;
  const pending = students?.filter((s) => s.status === "Pending")?.length || 0;
  const rejected =
    students?.filter((s) => s.status === "Rejected")?.length || 0;

  const stats = [
    {
      label: "Total Applications",
      value: totalStudents,
      icon: <FileText size={22} />,
      color: "from-purple-600 to-purple-400",
    },
    {
      label: "Approved",
      value: approved,
      icon: <CheckCircle size={22} />,
      color: "from-green-600 to-green-400",
    },
    {
      label: "Pending",
      value: pending,
      icon: <Clock size={22} />,
      color: "from-yellow-600 to-yellow-400",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: <XCircle size={22} />,
      color: "from-red-600 to-red-400",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={refreshStudents}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:bg-gray-600"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl border border-gray-700 bg-gradient-to-br ${s.color} text-white shadow-md flex items-center gap-4`}
          >
            <div className="bg-black/20 p-3 rounded-lg">{s.icon}</div>
            <div>
              <p className="text-sm text-white/80">{s.label}</p>
              <p className="text-3xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="mt-10 bg-[#0b1220]/60 border border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>

        {students?.length === 0 ? (
          <p className="text-sm text-slate-400">No applications yet.</p>
        ) : (
          <div className="space-y-3">
            {students?.slice(0, 5).map((student) => (
              <div
                key={student._id}
                className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-gray-700"
              >
                <div>
                  <p className="font-medium text-slate-200">{student.name}</p>
                  <p className="text-xs text-slate-400">
                    {student.regNo} • {student.department}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    student.status === "Approved"
                      ? "bg-green-500/20 text-green-400"
                      : student.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Auto-refresh indicator */}
      <div className="mt-4 text-xs text-slate-500 text-center">
        Auto-refreshes every 30 seconds • Last updated:{" "}
        {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default AdminDashboard;

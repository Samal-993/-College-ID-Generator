// src/components/AdminTable.jsx
import React, { useMemo, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { adminDetailsStore } from "../store/adminDetailsStore";

const AdminTable = ({ columns, onView }) => {
  const { students, isLoading, fetchAllStudents, approveStudent, rejectStudent } = adminDetailsStore();
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Fetch students when component mounts
  useEffect(() => {
    fetchAllStudents();
  }, [fetchAllStudents]);

  const filtered = useMemo(() => {
    let rows = students || [];
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter((r) =>
        columns.some((c) => r[c.key]?.toString().toLowerCase().includes(q))
      );
    }
    if (statusFilter) {
      rows = rows.filter(
        (r) => (r.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }
    return rows;
  }, [students, search, statusFilter, columns]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  const handleExport = () => {
    const exportRows = filtered.map((r) => {
      const obj = {};
      columns.forEach((c) => (obj[c.label || c.key] = r[c.key] ?? ""));
      return obj;
    });
    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Export");
    XLSX.writeFile(wb, "students_export.xlsx");
    toast.success("Data exported successfully!");
  };

  const getStatusBadge = (status) => {
    const colors = {
      approved: "bg-green-500/20 text-green-400 border-green-500/30",
      pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return (
      <span
        className={`px-3 py-1 border rounded-full text-xs font-semibold capitalize ${
          colors[status?.toLowerCase()] ||
          "bg-gray-600/20 text-gray-400 border-gray-500/30"
        }`}
      >
        {status || "Unknown"}
      </span>
    );
  };

  if (isLoading) {
    return <div className="text-center text-slate-400 py-8">Loading students...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          className="h-10 px-3 py-2 rounded-md border border-gray-700 bg-[#0b1220] text-slate-200 placeholder-slate-400 w-full sm:w-auto"
          placeholder="Search by name, reg no, or department..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="h-10 px-3 py-2 rounded-md border border-gray-700 bg-[#0b1220] text-slate-200"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={handleExport}
          className="h-10 px-4 bg-green-600 rounded-md text-white hover:bg-green-700 transition-all duration-200"
        >
          Export Excel
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-700 rounded-xl shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-[#0b1220] text-slate-300 text-xs uppercase">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-3 text-left border-r border-gray-800 font-medium"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-3 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-[#071028] text-slate-200">
            {pageData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="p-6 text-center text-slate-400"
                >
                  No matching records found 🙁
                </td>
              </tr>
            ) : (
              pageData.map((row, idx) => (
                <tr
                  key={row._id || idx}
                  className="hover:bg-white/5 transition-all duration-200"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-3 py-2 border-r border-gray-800 align-top"
                    >
                      {col.key === "status"
                        ? getStatusBadge(row[col.key])
                        : col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView?.(row)}
                        className="px-2 py-1 bg-gray-700 rounded text-white text-xs hover:bg-gray-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => approveStudent(row._id)}
                        disabled={row.status === "Approved"}
                        className={`px-2 py-1 text-xs rounded transition ${
                          row.status === "Approved"
                            ? "bg-green-600/30 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectStudent(row._id)}
                        disabled={row.status === "Rejected"}
                        className={`px-2 py-1 text-xs rounded transition ${
                          row.status === "Rejected"
                            ? "bg-red-600/30 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        } text-white`}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 text-sm text-slate-400">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-white transition disabled:opacity-50"
        >
          Prev
        </button>
        <div className="px-3 py-1 bg-blue-600 rounded text-white">
          Page {page} of {pages}
        </div>
        <button
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          disabled={page === pages}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-white transition disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="text-center text-xs text-slate-500 mt-2">
        Showing {(page - 1) * perPage + 1}–
        {Math.min(page * perPage, filtered.length)} of {filtered.length} entries
      </div>
    </div>
  );
};

export default AdminTable;
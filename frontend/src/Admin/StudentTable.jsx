import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { adminDetailsStore } from "../store/adminDetailsStore";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const StudentTable = () => {
  const { students, isLoading, fetchAllStudents, approveStudent, rejectStudent } = adminDetailsStore();
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch students on component mount
  useEffect(() => {
    fetchAllStudents();
  }, [fetchAllStudents]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllStudents();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchAllStudents]);

  // Reset page when search or filter changes
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  // Export to Excel
  const handleExport = () => {
    const exportData = filteredData.map(s => ({
      "Application ID": s._id,
      "Name": s.name,
      "Registration No": s.regNo,
      "DOB": s.dob || 'N/A',
      "Gender": s.gender,
      "Blood Group": s.bloodGroup || 'N/A',
      "Department": s.department,
      "Section": s.section || 'N/A',
      "Contact": s.contact || 'N/A',
      "Address": s.address || 'N/A',
      "Status": s.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, `students_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success("Excel exported successfully!");
  };

  // Print Table
  const handlePrint = () => {
    window.print();
  };

  // Approve / Reject functions
  const handleApprove = async (id) => {
    await approveStudent(id);
  };

  const handleReject = async (id) => {
    await rejectStudent(id);
  };

  // Filter + Search
  const filteredData = students.filter((s) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      s.name?.toLowerCase().includes(searchTerm) ||
      s.regNo?.toLowerCase().includes(searchTerm) ||
      s.department?.toLowerCase().includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white rounded-xl shadow-lg border border-gray-700">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by name, reg no, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-800 border border-gray-600 text-sm text-slate-200 placeholder-slate-400 flex-1 min-w-64"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-800 border border-gray-600 text-sm text-slate-200"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={handleExport}
          disabled={filteredData.length === 0}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Export Excel
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors"
        >
          Print
        </button>
        <button
          onClick={() => fetchAllStudents(true)}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Loading State */}
      {isLoading && students.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-slate-400">Loading student data...</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto border border-gray-700 rounded-lg">
            <table className="min-w-full text-sm text-slate-300">
              <thead className="bg-slate-800 text-slate-200 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-3 py-3 text-left">SL NO</th>
                  <th className="px-3 py-3 text-left">APPLICATION ID</th>
                  <th className="px-3 py-3 text-left">NAME</th>
                  <th className="px-3 py-3 text-left">REG NO</th>
                  <th className="px-3 py-3 text-left">DOB</th>
                  <th className="px-3 py-3 text-left">GENDER</th>
                  <th className="px-3 py-3 text-left">BLOOD GROUP</th>
                  <th className="px-3 py-3 text-left">DEPARTMENT</th>
                  <th className="px-3 py-3 text-left">SECTION</th>
                  <th className="px-3 py-3 text-left">CONTACT</th>
                  <th className="px-3 py-3 text-left">ADDRESS</th>
                  <th className="px-3 py-3 text-left">PHOTO</th>
                  <th className="px-3 py-3 text-left">STATUS</th>
                  <th className="px-3 py-3 text-left">ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((s, i) => (
                    <tr
                      key={s._id}
                      className="border-b border-gray-700 hover:bg-slate-800 transition-colors"
                    >
                      <td className="px-3 py-3">{startIndex + i + 1}</td>
                      <td className="px-3 py-3 font-mono text-xs">{s._id}</td>
                      <td className="px-3 py-3 font-medium">{s.name}</td>
                      <td className="px-3 py-3">{s.regNo}</td>
                      <td className="px-3 py-3">{s.dob || 'N/A'}</td>
                      <td className="px-3 py-3">{s.gender}</td>
                      <td className="px-3 py-3">{s.bloodGroup || 'N/A'}</td>
                      <td className="px-3 py-3">{s.department}</td>
                      <td className="px-3 py-3">{s.section || 'N/A'}</td>
                      <td className="px-3 py-3">{s.contact || 'N/A'}</td>
                      <td className="px-3 py-3 max-w-xs truncate" title={s.address || 'N/A'}>
                        {s.address || 'N/A'}
                      </td>
                      <td className="px-3 py-3">
                        {s.photo ? (
                          <img
                            src={s.photo}
                            alt={s.name}
                            className="w-10 h-10 rounded-md object-cover border border-gray-600"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-gray-700 flex items-center justify-center text-xs">
                            No Photo
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            s.status === "Approved"
                              ? "bg-green-600 text-white"
                              : s.status === "Rejected"
                              ? "bg-red-600 text-white"
                              : "bg-yellow-500 text-black"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-3">
                        <div className="flex gap-2">
                          {s.status === "Pending" ? (
                            <>
                              <button
                                onClick={() => handleApprove(s._id)}
                                className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 rounded transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(s._id)}
                                className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-gray-500 italic">
                              {s.status}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14" className="text-center py-8 text-slate-400">
                      {students.length === 0 
                        ? "No student applications found. Students will appear here after they submit their details."
                        : "No data matches your search criteria"
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="flex justify-between items-center mt-5">
              <div className="text-sm text-slate-400">
                Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} entries
                {students.length !== filteredData.length && ` (filtered from ${students.length} total)`}
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-blue-600 rounded font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Auto-refresh indicator */}
      <div className="mt-4 text-xs text-slate-500 text-center">
        Auto-refreshes every 30 seconds • Total Students: {students.length}
      </div>
    </div>
  );
};

export default StudentTable;
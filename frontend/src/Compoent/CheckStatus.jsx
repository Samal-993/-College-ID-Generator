// src/components/CheckStatus.jsx
import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const CheckStatus = () => {
  const [appId, setAppId] = useState("");
  const [status, setStatus] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    setStatus(null);
    setStudentData(null);
    
    if (!appId.trim()) {
      toast.error("Please enter application ID");
      return;
    }

    setLoading(true);
    try {
      // Fetch student details by ID
      const res = await axiosInstance.get(`/details/${appId}`, {
        withCredentials: true,
      });
      
      if (res.data) {
        setStatus(res.data.status);
        setStudentData(res.data);
      }
    } catch (error) {
      console.error("Error checking status:", error);
      setStatus("not-found");
      toast.error("Application not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Check Application Status</h2>

      <div onSubmit={handleCheck} className="flex flex-col md:flex-row gap-3 items-start">
        <input
          type="text"
          placeholder="Enter Application ID"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          className="w-full md:w-2/3 px-3 py-2 rounded-lg bg-[#0b1220] border border-gray-700 placeholder-slate-400 text-white"
        />
        <button 
          onClick={handleCheck}
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 transition"
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-white/5 border border-gray-700">
        {!status && !loading && (
          <div className="text-slate-300">Enter Application ID above to check status.</div>
        )}

        {loading && (
          <div className="text-slate-300">Loading...</div>
        )}

        {status === "not-found" && (
          <div className="text-yellow-300">❌ Application not found.</div>
        )}

        {status === "Pending" && studentData && (
          <div className="space-y-3">
            <div className="text-yellow-300 text-lg font-semibold">⏳ Pending Approval</div>
            <div className="text-sm text-slate-400">
              Your application is under review. You will be notified once approved.
            </div>
            <div className="mt-4 p-3 bg-slate-800/40 rounded-lg">
              <p className="text-slate-200"><strong>Name:</strong> {studentData.name}</p>
              <p className="text-slate-200"><strong>Reg No:</strong> {studentData.regNo}</p>
              <p className="text-slate-200"><strong>Department:</strong> {studentData.department}</p>
            </div>
          </div>
        )}

        {status === "Approved" && studentData && (
          <div className="space-y-3">
            <div className="text-emerald-400 text-lg font-semibold">✅ Approved</div>
            <div className="text-sm text-slate-400">
              Your ID card has been approved! You can now download your virtual ID.
            </div>
            <div className="mt-4 p-3 bg-slate-800/40 rounded-lg">
              <p className="text-slate-200"><strong>Name:</strong> {studentData.name}</p>
              <p className="text-slate-200"><strong>Reg No:</strong> {studentData.regNo}</p>
              <p className="text-slate-200"><strong>Department:</strong> {studentData.department}</p>
            </div>
          </div>
        )}

        {status === "Rejected" && studentData && (
          <div className="space-y-3">
            <div className="text-red-400 text-lg font-semibold">❌ Rejected</div>
            <div className="text-sm text-slate-400">
              Your application was rejected. Please contact admin for more details.
            </div>
            <div className="mt-4 p-3 bg-slate-800/40 rounded-lg">
              <p className="text-slate-200"><strong>Name:</strong> {studentData.name}</p>
              <p className="text-slate-200"><strong>Reg No:</strong> {studentData.regNo}</p>
              <p className="text-slate-200"><strong>Department:</strong> {studentData.department}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatus;
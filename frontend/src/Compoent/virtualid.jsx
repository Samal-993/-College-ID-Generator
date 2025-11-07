// src/components/VirtualID.jsx
import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import Lottie from "lottie-react";
import idcard from '../assect/Driver License Flip.json';
import toast from "react-hot-toast";

const PLACEHOLDER = {
  name: "Student Name",
  regNo: "22CSE000",
  department: "CSE",
  photo: null,
};

const VirtualID = () => {
  const [applicationId, setApplicationId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoad = async (e) => {
    e.preventDefault();
    
    if (!applicationId.trim()) {
      toast.error("Please enter application ID");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.get(`/details/${applicationId}`, {
        withCredentials: true,
      });
      
      if (res.data && res.data.status === "Approved") {
        setData(res.data);
        toast.success("ID Card loaded successfully!");
      } else if (res.data && res.data.status === "Pending") {
        toast.error("Your application is still pending approval");
        setData(null);
      } else if (res.data && res.data.status === "Rejected") {
        toast.error("Your application was rejected");
        setData(null);
      }
    } catch (error) {
      console.error("Error loading card:", error);
      toast.error("Application not found or not approved yet");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!data) {
      toast.error("No card to download");
      return;
    }
    toast.success("Download feature coming soon!");
    // Implement download logic here (e.g., generate PDF)
  };

  return (
    <div className="flex flex-col items-center w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Virtual ID Card</h2>

      {/* Search Form */}
      <div className="flex gap-3 mb-8 w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter Application ID to load card"
          className="px-4 py-2 rounded-lg bg-[#0b1220] border border-gray-700 placeholder-slate-400 flex-1 text-white"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
        />
        <button 
          onClick={handleLoad}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-gray-600"
        >
          {loading ? "Loading..." : "Load"}
        </button>
      </div>

      {/* Main Content - Animation + Card */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full max-w-5xl">
        
        {/* Left Side - Animation */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-64 h-64">
            <Lottie animationData={idcard} loop={true} />
          </div>
          {data && (
            <button 
              onClick={handleDownload}
              className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors font-semibold"
            >
              Download Card
            </button>
          )}
        </div>

        {/* Right Side - ID Card */}
        <div className="w-[380px] h-[540px] rounded-xl bg-gradient-to-br from-[#0f1724] to-[#071028] border-2 border-gray-700 text-white flex flex-col p-6 shadow-2xl">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/giet-removebg-preview.png" alt="College Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">GIET University</div>
              <div className="text-lg font-bold">Student ID Card</div>
            </div>
          </div>

          {/* Photo + Details Section */}
          <div className="flex gap-5 mb-6">
            <div className="w-28 h-32 bg-white/10 rounded-lg flex items-center justify-center text-xs text-slate-400 overflow-hidden border border-white/20">
              {data?.photo ? (
                <img
                  src={data.photo}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              ) : (
                "Photo"
              )}
            </div>

            <div className="flex flex-col justify-center gap-2 text-sm">
              <div className="flex gap-2">
                <span className="text-slate-400 font-semibold">Name:</span>
                <span className="text-white">{data?.name || PLACEHOLDER.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-400 font-semibold">Reg No:</span>
                <span className="text-white">{data?.regNo || PLACEHOLDER.regNo}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-400 font-semibold">Dept:</span>
                <span className="text-white">{data?.department || PLACEHOLDER.department}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-400 font-semibold">Gender:</span>
                <span className="text-white">{data?.gender || "-"}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-4"></div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="text-xs text-slate-400 mb-3 uppercase tracking-wider">Scan for verification</div>
            <div className="w-36 h-36 bg-white rounded-lg flex items-center justify-center text-black text-xs font-semibold overflow-hidden">
              {data ? (
                <div className="text-center p-2">
                  <div className="text-xs">QR CODE</div>
                  <div className="text-[8px] mt-1">{data._id}</div>
                </div>
              ) : (
                "QR CODE"
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-slate-500 mt-4 pt-3 border-t border-gray-700">
            Valid for Academic Year 2024-25
          </div>
        </div>
      </div>

      {/* Note */}
      <p className="text-sm text-slate-400 mt-6 text-center max-w-md">
        {data ? "Official ID Card - Approved" : "Preview only — Official card will be available after admin approval"}
      </p>
    </div>
  );
};

export default VirtualID;
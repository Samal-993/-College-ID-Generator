// src/components/StudentIDForm.jsx
import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios"; // ✅ import added
import { Copy, CheckCircle, Download, FileText } from "lucide-react";
import toast from "react-hot-toast";

const StudentIDForm = () => {
  const { submitDetails, isSubmittingDetails } = useAuthStore();

  const [studentData, setStudentData] = useState({
    name: "",
    regNo: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    department: "",
    section: "",
    phone: "",
    contact: "",
    address: "",
    photo: null,
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);

  const departments = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"];
  const genders = ["Male", "Female", "Other"];

  // ✅ define steps here
  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "Academic" },
    { id: 3, label: "Contact" },
    { id: 4, label: "Uploads" },
    { id: 5, label: "Review" },
  ];

  // ✅ Check if student already submitted
  useEffect(() => {
    const checkSubmission = async () => {
      try {
        const res = await axiosInstance.get("/details/me");
        if (res.data.hasSubmitted) {
          setHasSubmitted(true);
          setApplicationId(res.data.applicationId);
          setStatus(res.data.status);
        }
      } catch (err) {
        console.error("Error checking submission:", err);
      }
    };
    checkSubmission();
  }, []);

  // ✅ Show “already submitted” message first
  if (hasSubmitted) {
    return (
      <div className="min-h-[660px] bg-slate-900 py-10 px-4 flex items-center justify-center">
        <div className="bg-gradient-to-br from-slate-800 to-emerald-900 rounded-2xl shadow-2xl p-8 text-center text-white max-w-md w-full">
          <div className="mb-4">
            <CheckCircle size={64} className="text-emerald-400 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-3">
            🎉 You have already submitted your application!
          </h2>
          <p className="text-lg mb-2">
            Your Application ID:{" "}
            <span className="font-mono bg-slate-700 px-2 py-1 rounded">
              {applicationId}
            </span>
          </p>
          <p className="text-md mb-6">
            Status:{" "}
            <span
              className={`font-semibold ${
                status === "Approved"
                  ? "text-green-400"
                  : status === "Rejected"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {status}
            </span>
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                navigator.clipboard.writeText(applicationId);
                toast.success("Application ID copied!");
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Copy size={16} /> Copy ID
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Form logic
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/details", studentData);
      const id = res.data.details?._id || "STU-" + Date.now();
      setApplicationId(id);
      setSubmittedData(studentData);
      setShowModal(true);
      setStep(1);
      setStudentData({
        name: "",
        regNo: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        department: "",
        section: "",
        phone: "",
        contact: "",
        address: "",
        photo: null,
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data.message?.includes("already submitted")
      ) {
        setHasSubmitted(true);
        setApplicationId(error.response.data.applicationId);
        setStatus(error.response.data.status);
        toast.error("You have already submitted this application!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    toast.success("Application ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReceipt = () => {
    const receiptText = `
═══════════════════════════════════════════
        GIET UNIVERSITY
    Student ID Card Application
═══════════════════════════════════════════
APPLICATION ID: ${applicationId}
Name: ${submittedData.name}
Reg No: ${submittedData.regNo}
Department: ${submittedData.department}
Gender: ${submittedData.gender}
Status: Pending Approval
Submitted: ${new Date().toLocaleString()}
═══════════════════════════════════════════
Keep this Application ID safe!
═══════════════════════════════════════════
    `;
    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Application_${applicationId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Receipt downloaded!");
  };

  const inputBase =
    "bg-slate-700/40 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="h-[660px] bg-slate-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 rounded-2xl shadow-2xl ring-1 ring-black/40 overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">Student ID Card Application</h1>
            <p className="text-sm text-slate-300 mt-1">Fill details to apply for your student identity card.</p>
          </div>

          {/* Progress / Steps */}
          <div className="p-4 md:p-6 bg-slate-800/60 flex items-center gap-4 overflow-x-auto">
            <div className="flex-1">
              <div className="relative">
                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-3 text-xs text-slate-300">
                  {steps.map((s) => (
                    <div key={s.id} className="flex flex-col items-center min-w-[72px]">
                      <div
                        className={
                          `w-7 h-7 rounded-full flex items-center justify-center mb-1 text-[11px] ` +
                          (s.id <= step ? 'bg-indigo-500 text-white shadow' : 'bg-slate-700 text-slate-300')
                        }
                      >
                        {s.id}
                      </div>
                      <div className="text-[11px]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div onSubmit={handleSubmit} className="p-6 md:p-8 bg-gradient-to-b from-slate-800/40 to-slate-900/20">
            {/* Step 1: Personal */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Full Name *</label>
                    <input name="name" value={studentData.name} onChange={handleChange} placeholder="e.g., John Doe" className={inputBase} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Registration No *</label>
                    <input name="regNo" value={studentData.regNo} onChange={handleChange} placeholder="Registration No" className={inputBase} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Date of Birth *</label>
                    <input type="date" name="dob" value={studentData.dob} onChange={handleChange} className={inputBase} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Gender *</label>
                    <select name="gender" value={studentData.gender} onChange={handleChange} className={inputBase} required>
                      <option value="">Select Gender</option>
                      {genders.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Blood Group</label>
                    <input name="bloodGroup" value={studentData.bloodGroup} onChange={handleChange} placeholder="e.g., B+" className={inputBase} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Section</label>
                    <input name="section" value={studentData.section} onChange={handleChange} placeholder="Section" className={inputBase} />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Academic */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Academic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Department *</label>
                    <select name="department" value={studentData.department} onChange={handleChange} className={inputBase} required>
                      <option value="">Select Department</option>
                      {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button type="button" onClick={() => setStep(1)} className="px-4 py-2 rounded-md bg-slate-700 text-slate-200 hover:bg-slate-600 transition">Previous</button>
                  <button type="button" onClick={() => setStep(3)} className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition">Next</button>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Phone</label>
                    <input name="contact" value={studentData.contact} onChange={handleChange} placeholder="Mobile Number" className={inputBase} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-200 mb-2">Residential Address</label>
                    <textarea name="address" value={studentData.address} onChange={handleChange} placeholder="Street, City, State, PIN" rows={3} className={inputBase}></textarea>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button type="button" onClick={() => setStep(2)} className="px-4 py-2 rounded-md bg-slate-700 text-slate-200 hover:bg-slate-600 transition">Previous</button>
                  <button type="button" onClick={() => setStep(4)} className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition">Next</button>
                </div>
              </div>
            )}

            {/* Step 4: Uploads */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Uploads</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-slate-800/30 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-slate-200 mb-2">Passport Size Photo *</label>
                    <input 
                      type="file" 
                      name="photo" 
                      accept=".jpg,.jpeg,.png" 
                      onChange={handleFileChange} 
                      className="w-full text-slate-300"
                    />
                    {studentData.photo && (
                      <img src={studentData.photo} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button type="button" onClick={() => setStep(3)} className="px-4 py-2 rounded-md bg-slate-700 text-slate-200 hover:bg-slate-600 transition">Previous</button>
                  <button type="button" onClick={() => setStep(5)} className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition">Next</button>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Review & Submit</h2>

                <div className="bg-slate-800/30 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-100 text-sm">
                  <div>
                    <div className="text-slate-300 text-xs">Name</div>
                    <div className="font-medium">{studentData.name || '-'}</div>
                  </div>
                  <div>
                    <div className="text-slate-300 text-xs">Registration No</div>
                    <div className="font-medium">{studentData.regNo || '-'}</div>
                  </div>
                  <div>
                    <div className="text-slate-300 text-xs">Department</div>
                    <div className="font-medium">{studentData.department || '-'}</div>
                  </div>
                  <div>
                    <div className="text-slate-300 text-xs">Gender</div>
                    <div className="font-medium">{studentData.gender || '-'}</div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button type="button" onClick={() => setStep(4)} className="px-4 py-2 rounded-md bg-slate-700 text-slate-200 hover:bg-slate-600 transition">Previous</button>
                  <button 
                    type="button"
                    onClick={handleSubmit} 
                    disabled={isSubmittingDetails}
                    className="px-5 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 disabled:bg-gray-600"
                  >
                    {isSubmittingDetails ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Success Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="max-w-lg w-full bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-2xl p-8 border-2 border-emerald-200">
              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={48} className="text-emerald-600" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-emerald-600 text-center mb-2">
                Application Submitted Successfully!
              </h3>
              <p className="text-sm text-slate-600 text-center mb-6">
                Your application has been received. Save this ID for tracking.
              </p>

              {/* Application ID Display */}
              <div className="bg-white border-2 border-emerald-300 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <FileText className="text-emerald-600" size={20} />
                  <p className="text-sm font-semibold text-slate-700">Your Application ID:</p>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-3">
                  <p className="font-mono font-bold text-xl text-emerald-700 text-center break-all">
                    {applicationId}
                  </p>
                </div>

                {/* Copy Button */}
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition font-semibold"
                >
                  {copied ? (
                    <>
                      <CheckCircle size={20} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      Copy Application ID
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={downloadReceipt}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
                >
                  <Download size={18} />
                  Download Receipt
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition font-semibold"
                >
                  Close
                </button>
              </div>

              {/* Important Note */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 text-center">
                  ⚠️ <strong>Important:</strong> Keep this Application ID safe. You'll need it to check your application status and collect your ID card.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentIDForm;
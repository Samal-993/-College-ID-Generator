import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    try {
      await signup(formData);
      // toast.success("Registration successful!");
    } catch (error) {
      toast.error("Something went wrong during registration.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#111827] via-[#0e1a2b] to-[#04070f] p-6">
      <div className="w-full max-w-md bg-[#1f2937]/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-2 text-white tracking-wide">
          Register Student
        </h2>
        <p className="text-sm text-center text-gray-300 mb-6">
          Smart ID Card Management System
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-200 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full p-2 border border-gray-600 bg-[#111827] text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-gray-200 mb-1">Registration No.</label>
            <input
              type="text"
              required
              placeholder="Ex: 22CSE1234"
              className="w-full p-2 border border-gray-600 bg-[#111827] text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, regNo: e.target.value })
              }
              value={formData.regNo}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-200 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-600 bg-[#111827] text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-200 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full p-3 border border-gray-600 bg-[#111827] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 bottom-1 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Registering...
              </div>
            ) : (
              "Register Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-500 underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;

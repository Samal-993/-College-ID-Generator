import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAuthStore } from "../store/adminAuthStore";
import { Eye, EyeOff, Shield } from "lucide-react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingUp, authUser } = adminAuthStore();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (authUser) {
      navigate("/admin");
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#111827] via-[#0e1a2b] to-[#04070f] p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-slate-400">Sign in to access the control panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1f2937]/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-200 mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="admin@giet.edu"
                className="w-full p-3 border border-gray-600 bg-[#111827] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoggingUp}
            >
              {isLoggingUp ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Login Account"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-slate-400 hover:text-blue-400 transition"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-400 text-center">
            <strong>Demo:</strong> admin@giet.edu / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
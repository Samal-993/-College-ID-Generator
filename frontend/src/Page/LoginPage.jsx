import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

   const { login, isLoggingUp } = useAuthStore();


   const handleSubmit = (e) => {
      e.preventDefault();
  
      login(formData);
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#111827] via-[#0e1a2b] to-[#04070f] p-6">
      <div className="w-full max-w-md bg-[#1f2937]/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-2 text-white tracking-wide">
         Login Student 
        </h2>
        <p className="text-sm text-center text-gray-300 mb-6">
          Smart ID Card Management System
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-200 mb-1">
              Email / Registration No.
            </label>
            <input
              type="email"

              required
              placeholder="Enter email or reg no."
              className="w-full p-2 border border-gray-600 bg-[#111827] text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
               onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
              value={formData.email}
            />
          </div>

          <div>
            <label className="block text-gray-200 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter password"
              className="w-full p-2 border border-gray-600 bg-[#111827] text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
              value={formData.password}
            />
          </div>

        <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLoggingUp}
                  >
                    {isLoggingUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Login Account"
                    )}
                  </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-500 underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

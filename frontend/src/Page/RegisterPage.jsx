import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "react-hot-toast";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    RegisterNo:"",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
 console.log("Submitting form:", formData);
    signup(formData);
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

          <div>
            <label className="block text-gray-200 mb-1">Registration No.</label>
            <input
              type="text"
             
              required
              placeholder="Ex: 22CSE1234"
              className="w-full p-2 border border-gray-600 bg-[#111827] text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              onChange={(e) =>
                          setFormData({ ...formData, RegisterNo: e.target.value })
                        }
              value={formData.RegisterNo}
            />
          </div>

          <div>
            <label className="block text-gray-200 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
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
              placeholder="Create password"
              className="w-full p-2 border border-gray-600 bg-[#111827] text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
              value={formData.password}
            />
          </div>

           {/* Submit Button */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Register"
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

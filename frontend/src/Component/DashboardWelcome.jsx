import React from "react";
import Lottie from "lottie-react";
import studentAnim from "../assect/Student.json"; // <-- change path to your Lottie file
import { IdCard, ArrowLeftRight, GraduationCap } from "lucide-react";

const DashboardWelcome = ({ studentName }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
      <div className="bg-[#0d1b2a]/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-lg max-w-2xl w-full">
        
        {/* Lottie Animation */}
        <div className="flex justify-center mb-6">
          <Lottie 
            animationData={studentAnim} 
            loop={true} 
            className="w-60 md:w-72 lg:w-80"  // Auto responsive size
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white">
          {studentName ? `Welcome back, ${studentName}! 👋` : `Welcome to Your Student Dashboard 👋`}
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 mt-3 text-lg">
          Manage your Student ID services from the menu on the left.
        </p>

        {/* Icons Row */}
        <div className="flex gap-8 justify-center mt-8 text-gray-200">
          <div className="flex flex-col items-center">
            <IdCard size={32} />
            <span className="text-sm mt-1">Apply for ID</span>
          </div>

          <div className="flex flex-col items-center">
            <ArrowLeftRight size={32} />
            <span className="text-sm mt-1">Check Status</span>
          </div>

          <div className="flex flex-col items-center">
            <GraduationCap size={32} />
            <span className="text-sm mt-1">Virtual ID</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;

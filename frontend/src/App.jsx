import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard ";
// import StudentTable from "./Admin/StudentTable";
import AdminStudentsPage from "./Page/AdminStudentsPage ";
import { useAuthStore } from "./store/useAuthStore";
import { adminAuthStore } from "./store/adminAuthStore";
import PageLoader from "./lib/PageLoader";
import { useEffect } from "react";
import LandingPage from "./Page/LandingPage";
import RegisterPage from "./Page/RegisterPage";
import LoginPage from "./Page/LoginPage";
import StudentDashboard from "./Component/studentDashbord";
import ApplyID from "./Component/ApplyID";
import CheckStatus from "./Component/CheckStatus";
import VirtualID from "./Component/virtualid";
import AdminLogin from "./Page/AdminLogin";
import Manage_Admin from "./Admin/Manage_Admin";

function App() {
  const { checkAuth: checkStudentAuth, isCheckingAuth: isCheckingStudent, authUser: studentUser } = useAuthStore();
  const { checkAuth: checkAdminAuth, isCheckingAuth: isCheckingAdmin, authUser: adminUser } = adminAuthStore();

  useEffect(() => {
    checkStudentAuth();
    checkAdminAuth();
  }, [checkStudentAuth, checkAdminAuth]);

  // Show loader while checking auth
  if (isCheckingStudent || isCheckingAdmin) {
    return <PageLoader />;
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Student Auth Routes */}
        <Route 
          path="/register" 
          element={!studentUser ? <RegisterPage /> : <Navigate to="/dashbord" replace />} 
        />
        <Route 
          path="/login" 
          element={!studentUser ? <LoginPage /> : <Navigate to="/dashbord" replace />} 
        />

        {/* Admin Auth Route */}
        <Route 
          path="/adminLogin" 
          element={!adminUser ? <AdminLogin /> : <Navigate to="/admin" replace />} 
        />

        {/* Protected Student Routes */}
        <Route 
          path="/dashbord" 
          element={studentUser ? <StudentDashboard /> : <Navigate to="/login" replace />}
        >
          <Route path="apply" element={<ApplyID />} />
          <Route path="status" element={<CheckStatus />} />
          <Route path="virtual" element={<VirtualID />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route 
          path="/admin/*" 
          element={adminUser ? <AdminLayout /> : <Navigate to="/adminLogin" replace />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="manage-admin"element={<Manage_Admin/>}/>
        </Route>

        {/* Catch All - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

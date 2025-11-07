// src/pages/AdminStudentsPage.jsx
import React from "react";
import AdminTable from "../Admin/AdminTable";

const AdminStudentsPage = () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "regNo", label: "Reg No" },
    { key: "department", label: "Department" },
    { key: "gender", label: "Gender" },
    { key: "contact", label: "Contact" },
    { key: "status", label: "Status" },
  ];

  const handleView = (student) => {
    alert(`Viewing details for: ${student.name}`);
    // You can open a modal here to show full details
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Student Applications</h1>
      <AdminTable columns={columns} onView={handleView} />
    </div>
  );
};

export default AdminStudentsPage;
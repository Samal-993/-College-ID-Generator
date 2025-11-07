import mongoose from "mongoose";

const StudentDetailsSchema = new mongoose.Schema(
  {
    // ✅ Link to Student account
    studentId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Student",
      required: true 
    },
    
    // ✅ Track submission info
    submittedBy: { type: String }, // Email of student who submitted
    studentName: { type: String }, // Name from Student account
    
    // Form fields
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    department: { type: String },
    gender: { type: String },
    dob: { type: String },
    contact: { type: String },
    address: { type: String },
    
    // Status tracking
    status: { type: String, default: "Pending" },
    updatedBy: { type: String }, // Admin who updated status
  },
  { timestamps: true }
);

const StudentDetails = mongoose.model("StudentDetails", StudentDetailsSchema);

export default StudentDetails;
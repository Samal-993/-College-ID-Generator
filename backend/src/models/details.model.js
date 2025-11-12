// backend/src/models/details.model.js
import mongoose from "mongoose";

const StudentDetailsSchema = new mongoose.Schema(
  {
    // ✅ Link to Student account
    studentId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Student",
      required: true 
    },

    // ✅ Track who submitted
    submittedBy: { type: String, required: true }, // Email of student
    studentName: { type: String, required: true }, // Name of student

    // 🧾 Form Fields
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    department: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String },
    contact: { type: String },
    address: { type: String },
    photo: { type: String }, // base64 image from frontend (optional)

    // ⚙️ Status Tracking
    status: { 
      type: String, 
      enum: ["Pending", "Approved", "Rejected"], 
      default: "Pending" 
    },
    updatedBy: { type: String }, // Admin email or ID
  },
  { timestamps: true }
);

export default mongoose.model("StudentDetails", StudentDetailsSchema);

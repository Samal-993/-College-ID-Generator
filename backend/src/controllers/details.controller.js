// backend/src/controllers/details.controller.js
import StudentDetails from "../models/details.model.js";

// 🟢 Create new student details (form submission)
export const createDetails = async (req, res) => {
  try {
    // ✅ Get logged-in student info from middleware
    const studentId = req.user._id;
    const studentEmail = req.user.email;
    const studentName = req.user.name;

    // ✅ Create details with student reference
    const details = new StudentDetails({
      ...req.body,
      studentId: studentId,        // ✅ Link to student account
      submittedBy: studentEmail,   // ✅ Track who submitted
      studentName: studentName,    // ✅ Store student name
    });

    await details.save();
    
    res.status(201).json({ 
      message: "Student details submitted successfully", 
      details 
    });
  } catch (error) {
    console.error("❌ Error saving student details:", error);
    res.status(500).json({ error: "Failed to save details" });
  }
};

// 🟢 Get all student details (for admin dashboard)
export const getAllDetails = async (req, res) => {
  try {
    const allDetails = await StudentDetails.find().sort({ createdAt: -1 });
    res.status(200).json(allDetails);
  } catch (error) {
    console.error("❌ Error fetching details:", error);
    res.status(500).json({ error: "Failed to fetch student details" });
  }
};

// 🟢 Update student status (Approve / Reject)
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await StudentDetails.findByIdAndUpdate(
      id,
      { 
        status,
        updatedAt: new Date(), // ✅ Track when status changed
        updatedBy: req.user.email // ✅ Track which admin updated
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Student not found" });

    res.status(200).json({ message: "Status updated successfully", updated });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ error: "Failed to update student status" });
  }

  
};


// 🟢 Get single student details by ID (for status check)
export const getDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await StudentDetails.findById(id);
    
    if (!details) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(details);
  } catch (error) {
    console.error("❌ Error fetching details:", error);
    res.status(500).json({ error: "Failed to fetch student details" });
  }
};
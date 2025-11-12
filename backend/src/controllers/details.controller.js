// backend/src/controllers/details.controller.js
import StudentDetails from "../models/details.model.js";

// 🟢 Create new student details (form submission)
export const createDetails = async (req, res) => {
  try {
    // ✅ Logged-in student info from middleware
    const studentId = req.user._id;
    const studentEmail = req.user.email;
    const studentName = req.user.name;

    // 🛑 Check if already submitted
    const existingDetails = await StudentDetails.findOne({ studentId });
    if (existingDetails) {
      return res.status(400).json({
        message: "You have already submitted your ID card application.",
        applicationId: existingDetails._id,
        status: existingDetails.status,
        hasSubmitted: true,
      });
    }

    // ✅ Create and save new student details
    const details = new StudentDetails({
      ...req.body,
      studentId,
      submittedBy: studentEmail,
      studentName,
    });

    await details.save();

    res.status(201).json({
      message: "Student details submitted successfully",
      details,
      hasSubmitted: true,
    });
  } catch (error) {
    console.error("❌ Error saving student details:", error);
    res.status(500).json({ error: "Failed to save details" });
  }
};

// 🟢 Get all student details (for admin dashboard)
export const getAllDetails = async (req, res) => {
  try {
    // Sort newest first
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

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updated = await StudentDetails.findByIdAndUpdate(
      id,
      {
        status,
        updatedBy: req.user.email,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Student not found" });

    res.status(200).json({
      message: `Student application ${status.toLowerCase()} successfully`,
      updated,
    });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ error: "Failed to update student status" });
  }
};

// 🟢 Get single student details by ID
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

// 🟢 Get logged-in student's application details
export const getMyApplication = async (req, res) => {
  try {
    const studentId = req.user._id;
    const details = await StudentDetails.findOne({ studentId });

    if (!details) {
      return res.status(200).json({
        hasSubmitted: false,
        message: "No submission found",
      });
    }

    res.status(200).json({
      hasSubmitted: true,
      applicationId: details._id,
      status: details.status,
      details,
    });
  } catch (error) {
    console.error("❌ Error fetching student application:", error);
    res.status(500).json({ error: "Failed to fetch student details" });
  }
};

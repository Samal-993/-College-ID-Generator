import express from "express";
import {
  createDetails,
  getAllDetails,
  updateStatus,
  getDetailsById, // ✅ NEW
} from "../controllers/details.controller.js";
import { protectRoute as protectAdmin } from "../middleware/admin.middleware.js";
import { protectRoute as protectStudent } from "../middleware/student.middleware.js";

const router = express.Router();

// 🧾 Student submits details (STUDENT must be logged in)
router.post("/", protectStudent, createDetails);

// 🧾 Admin views all details (ADMIN must be logged in)
router.get("/", protectAdmin, getAllDetails);

// 🧾 Get single student by ID (for status check - no auth needed or use student auth)
router.get("/:id", getDetailsById);

// 🧾 Admin updates student status (ADMIN must be logged in)
router.put("/:id", protectAdmin, updateStatus);

export default router;
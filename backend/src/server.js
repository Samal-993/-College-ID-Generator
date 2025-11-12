import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import StudentRoutes from "./routes/student.routes.js";
import AdminRoutes from "./routes/admin.routes.js";
import detailsRoutes from "./routes/details.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const PORT = ENV.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"], // frontend URL
    credentials: true, // allow cookies/auth tokens
  })
);
app.use(cookieParser());

// API Routes
app.use("/api/student", StudentRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/details", detailsRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});



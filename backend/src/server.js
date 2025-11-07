import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import StudentRoutes from "./routes/student.routes.js";
import AdminRoutes from "./routes/admin.routes.js";
import detailsRoutes from "./routes/details.route.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Get proper __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = ENV.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173"],  // frontend URL
  credentials: true, // if using cookies/auth tokens
}));
app.use(cookieParser());


//api
app.use("/api/student", StudentRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/details", detailsRoutes);



// Serve frontend
if (ENV.NODE_ENV === "production") {
  // From backend/src/ go up twice to root, then into frontend/dist
  const distPath = path.join(__dirname, "..", "..", "frontend", "dist");
  
  console.log("📁 __dirname:", __dirname);
  console.log("📁 Serving from:", distPath);
  
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});
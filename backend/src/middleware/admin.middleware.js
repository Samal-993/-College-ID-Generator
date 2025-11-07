import jwt from "jsonwebtoken";
import Admin from "../models/admin.models.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res , next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if(!decoded){
      return res.status(401).json({message:"Unauthorized - Incvaild token"})
    }

    const user = await Admin.findById(decoded.userId).select("-password"); // Exclude password field
    if(!user){
      return res.status(401).json({message:"Unauthorized - User not found"})
    }

    req.user = user; // Attach user to the response object
    next(); // Proceed to the next middleware or route handler


  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(401).json({message: "Internal server error" });
  }
};

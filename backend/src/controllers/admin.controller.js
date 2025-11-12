import { generateToken } from "../lib/utils.js";
import Admin from "../models/admin.models.js";
import bcrypt from "bcryptjs";
import { ENV } from "../lib/env.js";
import validator from "validator";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be 6 characters" });
    }

    //check if email is vailds
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    // Step 2️⃣ — Sanitize (clean) email input
    const sanitizedEmail = validator.normalizeEmail(email);

    const admin = await Admin.findOne({ email: sanitizedEmail });

    if (admin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    if (newAdmin) {
      const savedUser = await newAdmin.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("error in signup controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    generateToken(admin._id, res);

    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    console.error("error in login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (_, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax", // 👈 same as generateToken
    secure: ENV.NODE_ENV === "production" ? true : false, // 👈 same as generateToken
    path: "/", // 👈 add this line
  });

  res.status(200).json({ message: "Logged out successfully" });
};

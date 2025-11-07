
import { generateToken } from "../lib/utils.js";
import Student from "../models/student.models.js";
import bcrypt from "bcryptjs";
import { ENV } from "../lib/env.js";



export const signup = async (req, res) => {
  console.log("REQUEST BODY:", req.body);
  const { name, RegisterNo , email, password } = req.body;

  try {
    if (!name || !RegisterNo || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
      

    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be 6 characters" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      name,
      RegisterNo,
      email,
      password: hashedPassword,
    });

    if (newStudent) {
      const savedUser = await newStudent.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newStudent._id,
        name: newStudent.name,
        RegisterNo:newStudent.RegisterNo,
        email: newStudent.email,
        profilePic: newStudent.profilePic,
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
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("error in login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (_, res) => {
    res.cookie("jwt", "", {maximumAge: 0})
    res.status(200).json({message: "Logged out successfully"})

}

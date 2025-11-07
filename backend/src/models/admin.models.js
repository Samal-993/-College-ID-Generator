import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
   
  },
  { timestamps: true } // createdAt, updatedAt
);


const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;

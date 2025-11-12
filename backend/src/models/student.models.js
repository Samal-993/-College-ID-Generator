import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
      name: {
        type: String,
        required: true,
      },
      regNo:{
        type:String,
        required:true
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


const Student = mongoose.model("Student", StudentSchema);

export default Student;

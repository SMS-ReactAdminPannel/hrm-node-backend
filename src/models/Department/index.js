import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    }
  ]
}, { timestamps: true });

export const Department = mongoose.model("Department", departmentSchema);

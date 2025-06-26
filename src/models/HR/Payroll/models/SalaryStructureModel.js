import mongoose from "mongoose";

const salaryStructureSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employeeUser",
      required: true,
      unique: true, // One salary structure per employee
    },
    basic: {
      type: Number,
      required: true,
    },
    hra: {
      type: Number,
      required: true,
    },
    conveyance: {
      type: Number,
      default: 0,
    },
    specialAllowance: {
      type: Number,
      default: 0,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    taxDeductions: {
      type: Number,
      default: 0,
    },
    pf: {
      type: Number,
      default: 0,
    },
    esi: {
      type: Number,
      default: 0,
    },
    otherDeductions: {
      type: Number,
      default: 0,
    },
    grossSalary: {
      type: Number,
      required: true,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    effectiveFrom: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const SalaryStructureModel = mongoose.model("SalaryStructure", salaryStructureSchema);
export default SalaryStructureModel;

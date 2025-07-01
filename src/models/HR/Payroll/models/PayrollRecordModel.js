import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const PayrollSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: false,
      unique: true,
      default: uuid,
    },
    employee_name: {
      type: String,
    },
    position_name: {
      type: String,
    },
    department_name: {
      type: String,
    },
    salary: {
      type: String,
    },
    total_employee: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const PayrollModel = mongoose.model("PayrollRecord", PayrollSchema);

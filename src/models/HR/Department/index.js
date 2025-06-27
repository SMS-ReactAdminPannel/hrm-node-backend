// src/models/Department/index.js
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const DepartmentSchema = new mongoose.Schema({
  
  id: {
    type: String,
    unique: true,
    default: function () {
      return this.department_name
        ? this.department_name.toLowerCase().replace(/\s+/g, "-")
        : `dept-${uuid()}`;
    },
  },
    name: { 
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subDescription: {
      type: String,
      
    },
    total_employee: {
      type: String,
      default: "0",
    },
    image: {
      type: String,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
      default: uuid,
    },
  }, { timestamps: true });
  


export const DepartmentModel = mongoose.model("departmentmodels", DepartmentSchema);


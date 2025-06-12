// controllers/Department/departmentController.js
import { Department } from "../../models/Department/index.js";

export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, message: "Department already exists" });
    }

    const department = new Department({ name, description });
    await department.save();

    res.status(201).json({ success: true, message: "Department created", department });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ success: true, departments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
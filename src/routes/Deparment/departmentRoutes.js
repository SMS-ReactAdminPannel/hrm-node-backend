import express from "express";
import  { Department } from "../../models/Department/index.js"; // Adjust the import path as necessary"

const router = express.Router();

// ✅ GET /api/departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find(); // Or your DB call
    res.json(departments);
  } catch (err) {
    console.error("Failed to fetch departments", err);
    res.status(500).json({ message: "Failed to fetch departments", error: err });
  }
});

// already existing POST /create
router.post("/create", async (req, res) => {
  try {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: "Failed to create department", error: err });
  }
});

export default router;

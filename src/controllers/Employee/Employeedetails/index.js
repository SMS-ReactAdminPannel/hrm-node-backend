import Employeedetails from "../../../models/Employee/Employeedetails/index.js";
import Validations from "../../../validations/index.js";

// Create Employee Detail
export const createEmployeeDetail = async (req, res) => {
  const { error } = Validations.EmpolyeeDetailValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const detail = await Employeedetails.create(req.body);
    res.status(201).json(detail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Employee Details (non-deleted)
export const getAllEmployeeDetails = async (req, res) => {
  try {
    const details = await Employeedetails.find({ isDeleted: false });
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Employee Detail by ID
export const getEmployeeDetailsById = async (req, res) => {
  try {
    const detail = await Employeedetails.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!detail) {
      return res.status(404).json({ message: "Employee detail not found" });
    }

    res.status(200).json(detail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Employee Detail by ID
export const updateEmployeeDetail = async (req, res) => {
  try {
    const detail = await Employeedetails.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!detail) return res.status(404).json({ message: "Employee detail not found" });
    res.json({ message: "Profile updated", data: detail });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Soft Delete Employee Detail
export const softDeleteEmployeeDetail = async (req, res) => {
  try {
    const detail = await Employeedetails.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: true },
      { new: true }
    );

    if (!detail) return res.status(404).json({ message: "Employee detail not found" });
    res.json({ message: "Profile soft deleted", data: detail });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

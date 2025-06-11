import { EmployeeAppraisalSchema } from "../../../models/HR/Appraisal/index.js";

// ✅ Create Appraisal
export const createAppraisal = async (req, res) => {
  try {
    const { employeeCode, period, rating, comments } = req.body;

    const newAppraisal = await EmployeeAppraisalSchema.create({
      employeeCode,
      period,
      rating,
      comments,
      // createdBy: req.user?._id || null // optional if you have auth
    });

    res.status(201).json({ success: true, data: newAppraisal });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create appraisal", error: err.message });
  }
};

// ✅ Get all Appraisals
export const getAllAppraisals = async (req, res) => {
  try {
    const appraisals = await EmployeeAppraisalSchema.find();
    res.status(200).json({ success: true, data: appraisals });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch appraisals", error: err.message });
  }
};

// ✅ Get Single Appraisal by ID
// Get by employeeCode instead of _id
export const getAppraisalByEmployeeCode = async (req, res) => {
  try {
    const appraisal = await EmployeeAppraisalSchema.findOne({ employeeCode: req.params.code });
    if (!appraisal) return res.status(404).json({ success: false, message: "Appraisal not found" });
    res.status(200).json({ success: true, data: appraisal });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch appraisal", error: err.message });
  }
};


// ✅ Update Appraisal by CODE
export const updateAppraisal = async (req, res) => {
  try {
    const updatedAppraisal = await EmployeeAppraisalSchema.findOneAndUpdate(
      { employeeCode: req.params.code },  // using employeeCode, not _id
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAppraisal) {
      return res.status(404).json({ success: false, message: "Appraisal not found" });
    }

    res.status(200).json({
      success: true,
      message: "Got updated",
      data: updatedAppraisal
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update appraisal",
      error: err.message
    });
  }
};

// ✅ Delete Appraisal by ID
export const deleteAppraisal = async (req, res) => {
  try {
    const deleted = await EmployeeAppraisalSchema.findOneAndDelete({ employeeCode: req.params.code });
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Appraisal not found" });
    }
    
    res.status(200).json({ success: true, message: "Appraisal deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete appraisal", error: err.message });
  }
};
;

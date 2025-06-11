import { GrievanceModel } from "../../../models/HR/Grievance/index.js";



export const createGrievance = async (req, res) => {
  try {
    const newGrievance = new GrievanceModel(req.body);
    const savedGrievance = await newGrievance.save();
    res.status(201).json(savedGrievance);
  } catch (error) {
    res.status(400).json({ message: "Failed to create grievance", error });
  }
};

// Get all grievances (optionally filter by status)
export const getAllGrievances = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const grievances = await GrievanceModel.find(query).sort({ date: -1 });
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch grievances", error });
  }
};


// Update grievance status (e.g., mark as solved)
export const updateGrievanceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await GrievanceModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Grievance not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update grievance", error });
  }
};

// Delete a grievance
export const deleteGrievance = async (req, res) => {
  try {
    const deleted = await GrievanceModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Grievance not found" });
    }
    res.status(200).json({ message: "Grievance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete grievance", error });
  }
};

import { CandidatesModel } from "../../../models/HR/Candidates/index.js";

export const createCandidates = async (req, res) => {
  try {
    const candidate = new CandidatesModel(req.body);
    const saved = await candidate.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await CandidatesModel.find({ is_deleted: false });
    res.status(200).json({ success: true, data: candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateCandidatesStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await CandidatesModel.findByIdAndUpdate(
      req.params.id,
      { "details.status": status }, 
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate status updated successfully",
      candidate: updated,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to update candidate", error });
  }
};

import express from "express";
import JobPosting from "../../models/Recruitment/job-postings/job-posting.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const job = new JobPosting(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const jobs = await JobPosting.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    console.error("Error fetching job by ID:", err);
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await JobPosting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const job = await JobPosting.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ message: "Job soft-deleted successfully" });
  } catch (err) {
    console.error("Error soft-deleting job:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const jobs = await JobPosting.find({ deleted: false }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;

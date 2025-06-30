
import JobPosting from '../../models/Recruitment/job-postings/job-posting.js';

export const createJobPosting = async (req, res) => {
  try {
    const job = new JobPosting(req.body);
    await job.save();
    res.status(201).json({ success: true, job });
  } catch (error) {
    console.error("Error creating job posting:", error);
    res.status(500).json({ success: false, message: "Failed to create job" });
  }
};

export const getAllJobPostings = async (req, res) => {
  try {
    const jobs = await JobPosting.find().sort({ createdAt: -1 });
    if (jobs.length === 0) {
      return res.status(404).json({ success: false, message: "No job postings found" });
    }
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

export const getJobPostingById = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ success: false, message: "Failed to fetch job" });
  }
};

export const updateJobPosting = async (req, res) => {
  try {
    const updatedJob = await JobPosting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job: updatedJob });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ success: false, message: "Failed to update job" });
  }
};

export const deleteJobPosting = async (req, res) => {
  try {
    const deletedJob = await JobPosting.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: "Failed to delete job" });
  }
};

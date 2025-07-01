
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
    const jobs = await JobPosting.find({ deleted: false });
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
    const updatedJob = await JobPosting.findByIdAndUpdate(req.params.id, req.body);
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
    const updatedJob = await JobPosting.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true } 
    );
    
    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Job soft deleted successfully",
      data: updatedJob
    });
  } catch (error) {
    console.error("Error soft deleting job:", error);
    res.status(500).json({ success: false, message: "Failed to soft delete job" });
  }
};
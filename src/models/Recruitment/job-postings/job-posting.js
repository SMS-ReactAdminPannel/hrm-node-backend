import mongoose from "mongoose";

const JobPostingSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    roles: [{ type: String, required: true }],
    capacity: { type: Number, required: true },
    description: { type: String, required: true },
    location: { type: String },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    postedSince: { type: String, default: "Just now" },
    logo: { type: String, default: "💼" },
    applied: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false }, 
    
  },
  { timestamps: true }
);

const JobPosting = mongoose.model("JobPosting", JobPostingSchema);
export default JobPosting;
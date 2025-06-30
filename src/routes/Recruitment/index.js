// routes/hr/jobPosting.routes.js
import express from 'express';
import {
  createJobPosting,
  getAllJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting,
} from '../../controllers/recruitment/job-postings.js';


const JobPostingRouter = express.Router();

JobPostingRouter.post('/', createJobPosting);
JobPostingRouter.get('/', getAllJobPostings);
JobPostingRouter.get('/:id', getJobPostingById);
JobPostingRouter.put('/:id', updateJobPosting);
JobPostingRouter.delete('/:id', deleteJobPosting);

export default JobPostingRouter; // 



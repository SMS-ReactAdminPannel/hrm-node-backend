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
JobPostingRouter.get('/getJobs', getAllJobPostings);
JobPostingRouter.get('/:id', getJobPostingById);
JobPostingRouter.put('/updateJob/:id', updateJobPosting);
JobPostingRouter.put('/deleteJob/:id', deleteJobPosting);

export default JobPostingRouter; // 



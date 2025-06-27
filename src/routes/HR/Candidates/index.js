import express from "express"
import { createCandidates, getAllCandidates, updateCandidatesStatus } from "../../../controllers/HR/Candidates/index.js";


const CandidatesRouter = express.Router();
CandidatesRouter.post("/create",createCandidates)
CandidatesRouter.get("/getall",getAllCandidates)
CandidatesRouter.put("/:id/status", updateCandidatesStatus);

export default CandidatesRouter
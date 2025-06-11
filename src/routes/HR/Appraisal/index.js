import express from "express";
import {
  createAppraisal,
  getAllAppraisals,
  getAppraisalById,
  updateAppraisal,
  deleteAppraisal
} from "../../../controllers/HR/Appraisal/index.js";

const Appraisalrouter = express.Router();

Appraisalrouter.post("/", createAppraisal);
Appraisalrouter.get("/", getAllAppraisals);
Appraisalrouter.get("/:id", getAppraisalById);
Appraisalrouter.put("/:id", updateAppraisal);
Appraisalrouter.delete("/:id", deleteAppraisal);

export default Appraisalrouter;

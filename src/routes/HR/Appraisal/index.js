import express from "express";
import {
  createAppraisal,
  getAllAppraisals,
  getAppraisalByEmployeeCode,
  updateAppraisal,
  deleteAppraisal
} from "../../../controllers/HR/Appraisal/index.js";

const Appraisalrouter = express.Router();

Appraisalrouter.post("/", createAppraisal);
Appraisalrouter.get("/", getAllAppraisals);
Appraisalrouter.get("/code/:code",getAppraisalByEmployeeCode);
Appraisalrouter.put("/code/:code", updateAppraisal);
Appraisalrouter.delete("/code/:code", deleteAppraisal);

export default Appraisalrouter;

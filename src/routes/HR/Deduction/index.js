import express from "express"
import { createDeductionType, createEmployeeDeduction, getAllDeductionTypes, getAllEmployeeDeductionTypes } from "../../../controllers/Deductions/index.js";

const DeductionRouter = express.Router();

DeductionRouter.post("/",createDeductionType)
DeductionRouter.get("/getall",getAllDeductionTypes)
DeductionRouter.post("/employee-deduction",createEmployeeDeduction)
DeductionRouter.get("/getall-employee-deductions",getAllEmployeeDeductionTypes)

export default DeductionRouter
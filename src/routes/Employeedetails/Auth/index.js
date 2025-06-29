// src/routes/employeedetails/index.js

import express from "express";
import {
  createEmployeeDetail,
  getAllEmployeeDetails,
  updateEmployeeDetail,
  softDeleteEmployeeDetail,
  getEmployeeDetailById,
} from "../../../controllers/Employeedetails/index.js";

const EmployeedetailsRouter = express.Router();


EmployeedetailsRouter.post("/", createEmployeeDetail); 
EmployeedetailsRouter.get("/", getAllEmployeeDetails); 
EmployeedetailsRouter.get("/:id", getEmployeeDetailById); 
EmployeedetailsRouter.patch("/:id", updateEmployeeDetail); 
EmployeedetailsRouter.delete("/:id", softDeleteEmployeeDetail);

export default EmployeedetailsRouter;

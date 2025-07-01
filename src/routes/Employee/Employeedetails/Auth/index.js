import express from "express";
import {
  createEmployeeDetail,
  getAllEmployeeDetails,
  updateEmployeeDetail,
  softDeleteEmployeeDetail,
  getEmployeeDetailsById,
} from "../../../../controllers/Employee/Employeedetails/index.js";

const EmployeedetailsRouter = express.Router();

EmployeedetailsRouter.post("/", createEmployeeDetail);
EmployeedetailsRouter.get("/", getAllEmployeeDetails);
EmployeedetailsRouter.get("/:id", getEmployeeDetailsById);
EmployeedetailsRouter.patch("/:id", updateEmployeeDetail);
EmployeedetailsRouter.delete("/:id", softDeleteEmployeeDetail);

export default EmployeedetailsRouter;

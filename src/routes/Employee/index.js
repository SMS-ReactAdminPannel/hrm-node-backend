import express from "express"
import EmployeedetailsRouter from "./Employeedetails/Auth/index.js";
import authEmployeeRoute from "./Employee/Auth/index.js";

const EmployeeRouter = express.Router();

EmployeeRouter.use("/auth",authEmployeeRoute )
EmployeeRouter.use("/employeedetails",EmployeedetailsRouter)

export default EmployeeRouter;
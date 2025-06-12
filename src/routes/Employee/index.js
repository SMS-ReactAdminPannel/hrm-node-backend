import express from "express"
import authEmployeeRoute from "./Auth/index.js";

const EmployeeRouter = express.Router();

EmployeeRouter.use("/auth", authEmployeeRoute )
export default EmployeeRouter;
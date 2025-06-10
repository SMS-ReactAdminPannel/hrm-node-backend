import express from "express"
import LeaveRouter from "./LeaveManagement/index.js";
import LeaveTypeRouter from "./LeaveTypeManagement/index.js";

const HrRouter = express.Router();

HrRouter.use("/leave", LeaveRouter)
HrRouter.use("/leave-type", LeaveTypeRouter)
export default HrRouter;
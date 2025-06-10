import express from "express"
import LeaveRouter from "./LeaveManagement/index.js";

const HrRouter = express.Router();

HrRouter.use("/leave", LeaveRouter)
export default HrRouter;
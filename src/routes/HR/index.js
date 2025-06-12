import express from "express"
import LeaveRouter from "./LeaveManagement/index.js";
import LeaveTypeRouter from "./LeaveTypeManagement/index.js";
import ShiftRouter from "./Shift/index.js";
import DeductionRouter from "./Deduction/index.js";

const HrRouter = express.Router();

HrRouter.use("/leave", LeaveRouter)
HrRouter.use("/leave-type", LeaveTypeRouter)
HrRouter.use("/shift",ShiftRouter)
HrRouter.use("/deductions",DeductionRouter)
export default HrRouter;
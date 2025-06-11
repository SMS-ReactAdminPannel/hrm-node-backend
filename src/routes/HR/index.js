import express from "express"
import HrAuthRouter from "./Auth/index.js";
import Appraisalrouter from "./Appraisal/index.js";
import AnnouncementRouter from "./Announcement/index.js";
import DepartmentRouter from "./Department/index.js";
import PayrollRouter from "./Payroll/index.js";
import LeaveRouter from "./LeaveManagement/index.js";
import LeaveTypeRouter from "./LeaveTypeManagement/index.js";
import ShiftRouter from "./Shift/index.js";

const HrRouter = express.Router();

HrRouter.use('/auth',HrAuthRouter),
HrRouter.use('/Appraisal',Appraisalrouter)
HrRouter.use("/announcement", AnnouncementRouter);
HrRouter.use("/department", DepartmentRouter);
HrRouter.use("/payroll", PayrollRouter);
HrRouter.use("/leave", LeaveRouter);
HrRouter.use("/leave-type", LeaveTypeRouter)
HrRouter.use("/shift",ShiftRouter)
export default HrRouter;
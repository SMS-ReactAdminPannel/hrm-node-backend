import express from "express"
import AssetCategoryRouter from "./AssetCategory/index.js";
import HrAuthRouter from "./Auth/index.js";
import Appraisalrouter from "./Appraisal/index.js";
import DepartmentRouter from "./Department/index.js";
import TimeSheetrouter from "./TimeSheet/index.js";
import AnnouncementRouter from "./Announcement/index.js";
import PayrollRouter from "./Payroll/index.js";
import GrievanceRouter from "./Grievance/index.js";
import CandidatesRouter from "./Candidates/index.js";
import LeaveTypeRouter from "./LeaveTypeManagement/index.js";
import ShiftRouter from "./Shift/index.js";
import LeaveRouter from "./LeaveManagement/index.js";

import DeductionRouter from "./Deduction/index.js";

const HrRouter = express.Router();
HrRouter.use("/assetcategory",AssetCategoryRouter)
HrRouter.use("/department",DepartmentRouter)
HrRouter.use("/timesheet",TimeSheetrouter)
HrRouter.use('/auth',HrAuthRouter),
HrRouter.use('/Appraisal',Appraisalrouter)
HrRouter.use("/announcement", AnnouncementRouter);
HrRouter.use("/department", DepartmentRouter);
HrRouter.use("/payroll", PayrollRouter);
HrRouter.use("/leave", LeaveRouter);
HrRouter.use("/grievance",GrievanceRouter)
HrRouter.use("/candidates",CandidatesRouter)
HrRouter.use("/leaveType", LeaveTypeRouter)
HrRouter.use("/shift",ShiftRouter)
HrRouter.use("/deductions",DeductionRouter)
export default HrRouter;
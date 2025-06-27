import express from "express"
import AssetCategoryRouter from "./AssetCategory/index.js";
import HrAuthRouter from "./Auth/index.js";
import Appraisalrouter from "./Appraisal/index.js";
import departmentRouter from "./Department/index.js";
import TimeSheetrouter from "./TimeSheet/index.js";
import AnnouncementRouter from "./Announcement/index.js";
import PayrollRouter from "./Payroll/index.js";
import GrievanceRouter from "./Grievance/index.js";
import CandidatesRouter from "./Candidates/index.js";
import LeaveTypeRouter from "./LeaveTypeManagement/index.js";
import ShiftRouter from "./Shift/index.js";
import LeaveRouter from "./LeaveManagement/index.js";
import DeductionRouter from "./Deduction/index.js";
import VisitorRoute from "./VisitorManagement/index.js";


import TrainingMangament from "./Training/index.js";

const HRRouter = express.Router();

HRRouter.use("/assetcategory", AssetCategoryRouter);
HRRouter.use("/auth", HrAuthRouter);
HRRouter.use("/appraisal", Appraisalrouter);
HRRouter.use("/departments", departmentRouter);
HRRouter.use("/timesheet", TimeSheetrouter);
HRRouter.use("/announcement", AnnouncementRouter);
HRRouter.use("/payroll", PayrollRouter);
HRRouter.use("/leave", LeaveRouter);
HRRouter.use("/grievance",GrievanceRouter)
HRRouter.use("/candidates",CandidatesRouter)
HRRouter.use("/leaveType", LeaveTypeRouter)
HRRouter.use("/shift",ShiftRouter)
HRRouter.use("/deductions",DeductionRouter)
HRRouter.use("/visitors",VisitorRoute)
HRRouter.use("/deductions", DeductionRouter);
HRRouter.use("/training",TrainingMangament)


export default HRRouter;

import express from "express"
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
import AssetPropertyRouter from "./AssetCategory/index.js";


const HrRouter = express.Router();
HrRouter.use("/assetproperty",AssetPropertyRouter)
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
HrRouter.use("/leave-type", LeaveTypeRouter)
HrRouter.use("/shift",ShiftRouter)

export default HrRouter;
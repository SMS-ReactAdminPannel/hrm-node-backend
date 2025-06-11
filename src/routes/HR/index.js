import express from "express"
import AssetCategoryRouter from "./AssetCategory/index.js";
import DepartmentRouter from "./Department/index.js";
import TimeSheetrouter from "./TimeSheet/index.js";
import AnnouncementRouter from "./Announcement/index.js";
import PayrollRouter from "./Payroll/index.js";
import LeaveRouter from "./Leave/index.js";
import GrievanceRouter from "./Grievance/index.js";


const HrRouter = express.Router();
HrRouter.use("/assetcategory",AssetCategoryRouter)
HrRouter.use("/department",DepartmentRouter)
HrRouter.use("/timesheet",TimeSheetrouter)
HrRouter.use("/announcement", AnnouncementRouter);
HrRouter.use("/department", DepartmentRouter);
HrRouter.use("/payroll", PayrollRouter);
HrRouter.use("/leave", LeaveRouter);
HrRouter.use("/grievance",GrievanceRouter)



export default HrRouter;
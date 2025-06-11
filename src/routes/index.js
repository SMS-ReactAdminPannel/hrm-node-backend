import express from "express"
import AdminRouter from "./Admin/index.js";
import HrRouter from "../routes/HR/index.js";
import EmployeeRouter from "./Employee/index.js";
import GuestRouter from "./Guest/index.js";
import AnnouncementRouter from "./HR/Announcement/index.js";
import DepartmentRouter from "./HR/Department/index.js";
import PayrollRouter from "./HR/Payroll/index.js";
import LeaveRouter from "./HR/Leave/index.js";
import AssetCategoryRouter from "./HR/AssetCategory/index.js";
import TimeSheetrouter from "./HR/TimeSheet/index.js";
import GrievanceRouter from "./HR/Grievance/index.js";

const routes = express.Router();

routes.use("/admin", AdminRouter);
routes.use("/hr", HrRouter);
routes.use("/employee", EmployeeRouter);
routes.use("/guest", GuestRouter)
routes.use("/assetcategory",AssetCategoryRouter)
routes.use("/department",DepartmentRouter)
routes.use("/timesheet",TimeSheetrouter)
routes.use("/guest", GuestRouter);
routes.use("/announcement",AnnouncementRouter);
routes.use("/department",DepartmentRouter);
routes.use("/payroll",PayrollRouter);
routes.use("/leave",LeaveRouter);
routes.use("/grievance",GrievanceRouter)

export default routes;
import express from "express"
import AnnouncementRouter from "./Announcement/index.js";
import DepartmentRouter from "./Department/index.js";
import PayrollRouter from "./Payroll/index.js";
import LeaveRouter from "./Leave/index.js";

const HrRouter = express.Router();
HrRouter.use("/announcement", AnnouncementRouter);
HrRouter.use("/department", DepartmentRouter);
HrRouter.use("/payroll", PayrollRouter);
HrRouter.use("/leave", LeaveRouter);



export default HrRouter;
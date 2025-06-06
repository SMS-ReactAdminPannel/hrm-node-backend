import express from "express"
import AdminRouter from "./Admin/index.js";
import HrRouter from "../routes/HR/index.js";
import EmployeeRouter from "./Employee/index.js";
import GuestRouter from "./Guest/index.js";
import AnnouncementRouter from "./HR/Announcement/index.js";
import DepartmentRouter from "./HR/Department/index.js";

const routes = express.Router();

routes.use("/admin", AdminRouter);
routes.use("/hr", HrRouter);
routes.use("/employee", EmployeeRouter);
routes.use("/guest", GuestRouter);
routes.use("/announcement",AnnouncementRouter);
routes.use("/department",DepartmentRouter);

export default routes;
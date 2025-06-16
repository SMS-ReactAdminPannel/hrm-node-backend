import express from "express"
import AdminRouter from "./Admin/index.js";
import EmployeeRouter from "./Employee/index.js";
import GuestRouter from "./Guest/index.js";
import HrRouter from "./HR/Index.js";
import jobPostingRoutes from "./Recruitment/jobposting.js";

const routes = express.Router();

routes.use("/admin", AdminRouter);
routes.use("/hr", HrRouter);
routes.use("/employee", EmployeeRouter);
routes.use("/guest", GuestRouter);
routes.use("/job-postings", jobPostingRoutes);

export default routes;
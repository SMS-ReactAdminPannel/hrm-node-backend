import express from "express"
import AnnouncementRouter from "./Announcement/index.js";
import DepartmentRouter from "./Department/index.js";

const HrRouter = express.Router();
HrRouter.use("/announcement", AnnouncementRouter);
HrRouter.use("/department", DepartmentRouter);



export default HrRouter;
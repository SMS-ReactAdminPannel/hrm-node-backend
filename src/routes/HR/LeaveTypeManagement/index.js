import express from "express";
import { createLeaveType, deleteLeave, getall, getUniqueLeave, updateLeaveType } from "../../../controllers/LeaveTypeManagement/index.js";

const LeaveTypeRouter = express.Router();

LeaveTypeRouter.post("/", createLeaveType);
LeaveTypeRouter.get("/getall", getall);
LeaveTypeRouter.get("/get/:uuid", getUniqueLeave);
LeaveTypeRouter.put("/update/:uuid", updateLeaveType);
LeaveTypeRouter.delete("/delete/:uuid", deleteLeave);

export default LeaveTypeRouter;
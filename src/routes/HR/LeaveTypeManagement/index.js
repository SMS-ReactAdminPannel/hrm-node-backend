import express from "express";
import { createLeaveType, deleteLeave, getall, getUniqueLeave, updateLeaveType } from "../../../controllers/LeaveTypeManagement/index.js";

const LeaveTypeRouter = express.Router();

LeaveTypeRouter.post("/createLeaveType", createLeaveType);
LeaveTypeRouter.get("/getAllLeave", getall);
LeaveTypeRouter.get("/getUniqueLeave/:uuid", getUniqueLeave);
LeaveTypeRouter.put("/updateLeave/:uuid", updateLeaveType);
LeaveTypeRouter.delete("/deleteLeave/:uuid", deleteLeave);

export default LeaveTypeRouter;
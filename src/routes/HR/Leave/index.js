import express from "express"
import { LeaveCreate, LeaveDelete, LeaveGetOne, LeaveUpdateWithUUID } from "../../../controllers/HR/Leave/index.js";

const LeaveRouter = express.Router();
LeaveRouter.post("/create", LeaveCreate)
LeaveRouter.get("/get/:id",LeaveGetOne)
LeaveRouter.put("/update/:id",LeaveUpdateWithUUID)
LeaveRouter.delete("/delete/:id",LeaveDelete)
export default LeaveRouter

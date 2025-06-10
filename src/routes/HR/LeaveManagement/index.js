import express from "express"
import { deleteHoliday, getHolidays, NewHoliday, updateHoliday } from "../../../controllers/LeaveManagement/index.js";

const LeaveRouter = express.Router();

LeaveRouter.post("/",NewHoliday);
LeaveRouter.get("/getHolidays",getHolidays);
LeaveRouter.put("/updateHoliday/:uuid",updateHoliday);
LeaveRouter.delete("/deleteHoliday/:uuid",deleteHoliday);

export default LeaveRouter;
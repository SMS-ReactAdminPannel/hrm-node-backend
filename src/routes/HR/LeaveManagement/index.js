import express from "express"
import { deleteHoliday, getHolidays, NewHoliday, updateHoliday } from "../../../controllers/LeaveManagement/index.js";

const LeaveRouter = express.Router();

LeaveRouter.post("/createHoliday", NewHoliday);
LeaveRouter.get("/getAll", getHolidays);
LeaveRouter.put("/updateHoliday/:uuid", updateHoliday);
LeaveRouter.delete("/deleteHoliday/:uuid", deleteHoliday);

export default LeaveRouter;
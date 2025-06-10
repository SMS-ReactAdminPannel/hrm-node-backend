import express from "express"
import { deleteHoliday, getHolidays, NewHoliday, updateHoliday } from "../../../controllers/LeaveManagement/index.js";

const LeaveRouter = express.Router();

LeaveRouter.post("/", NewHoliday);
LeaveRouter.get("/getall", getHolidays);
LeaveRouter.put("/update/:uuid", updateHoliday);
LeaveRouter.delete("/delete/:uuid", deleteHoliday);

export default LeaveRouter;
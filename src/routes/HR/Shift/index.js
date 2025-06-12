import express from "express";
import { createShift, employeeShiftAssign, getEmployeeShift } from "../../../controllers/Shift/index.js";

const ShiftRouter = express.Router();

ShiftRouter.post("/", createShift);
ShiftRouter.post("/assign",employeeShiftAssign);
ShiftRouter.get("/get/:id",getEmployeeShift)

export default ShiftRouter;
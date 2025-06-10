import express from "express"
import { DepartmentDelete, DepartmentGetAll, DepartmentGetOne } from "../../../controllers/HR/Department/index.js";

const DepartmentRouter = express.Router();

DepartmentRouter.get("/get/:id",DepartmentGetOne)
DepartmentRouter.get("/getall",DepartmentGetAll)

DepartmentRouter.delete("/delete/:id",DepartmentDelete)
export default DepartmentRouter
import express from "express"
import { DepartmentCreate, DepartmentUpdateWithUUID } from "../../../controllers/HR/Department/index.js";




const DepartmentRouter = express.Router();
DepartmentRouter.post("/create", DepartmentCreate)
DepartmentRouter.put("/update/:id",DepartmentUpdateWithUUID)

export default DepartmentRouter
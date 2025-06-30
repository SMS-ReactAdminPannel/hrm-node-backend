import express from "express"
import { PayrollCreate, PayrollDelete, PayrollGetAll, PayrollGetOne, PayrollUpdateWithUUID } from "../../../controllers/HR/Payroll/index.js";

const PayrollRouter = express.Router();
PayrollRouter.post("/create", PayrollCreate)
PayrollRouter.get("/get/:id",PayrollGetOne)
PayrollRouter.get("/get",PayrollGetAll)
PayrollRouter.put("/update/:id",PayrollUpdateWithUUID)
PayrollRouter.delete("/delete/:id",PayrollDelete)
export default PayrollRouter

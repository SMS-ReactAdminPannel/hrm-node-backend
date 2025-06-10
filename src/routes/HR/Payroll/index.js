import express from "express"
import { PayrollCreate, PayrollDelete, PayrollGetOne, PayrollUpdateWithUUID } from "../../../controllers/HR/Payroll/index.js";

const PayrollRouter = express.Router();
PayrollRouter.post("/create", PayrollCreate)
PayrollRouter.get("/get/:id",PayrollGetOne)
PayrollRouter.put("/update/:id",PayrollUpdateWithUUID)
PayrollRouter.delete("/delete/:id",PayrollDelete)
export default PayrollRouter

import express from "express"
import { PayrollCreate, PayrollDelete, PayrollGetOne, PayrollUpdateWithUUID, PayrollGetAll ,ProcessPayroll } from "../../../controllers/HR/Payroll/index.js";

const PayrollRouter = express.Router();
PayrollRouter.post("/create", PayrollCreate)
PayrollRouter.get("/get/:id",PayrollGetOne)
PayrollRouter.get("/get",PayrollGetAll)
PayrollRouter.put("/update/:id",PayrollUpdateWithUUID)
PayrollRouter.delete("/delete/:id",PayrollDelete)
PayrollRouter.get("/get-all", PayrollGetAll);
PayrollRouter.post("/process", ProcessPayroll);




export default PayrollRouter

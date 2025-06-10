import express from "express"
import { addBonus, generatePayroll, getPayrollHistory, getPayrollLogs, getPayslip, getTaxReport, setPayrollStructure, updatePayrollSettings } from "../../../controllers/HR/Payroll/index.js";

const PayrollRouter = express.Router();
PayrollRouter.post("/create-structure", setPayrollStructure)
PayrollRouter.post("/create-payroll", generatePayroll)
PayrollRouter.get("/get-slip/:id",getPayslip)
PayrollRouter.get("/get-history/:id",getPayrollHistory)
PayrollRouter.get("/get-taxreport/:id",getTaxReport)
PayrollRouter.get("/get-logs/:id",getPayrollLogs)
PayrollRouter.put("/update-bonus/:id",addBonus)
PayrollRouter.put("/update-settings/:id",updatePayrollSettings)


export default PayrollRouter

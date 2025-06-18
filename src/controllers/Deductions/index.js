import { DeductionType, EmployeeDeduction } from "../../models/Deductions/index.js";

export const createDeductionType = async (req,res)=>{
    try{
        const {
            name,
            description
        } = req.body;

        const deduction = new DeductionType({
            name,
            description
        })
        await deduction.save();
        res.status(200).json({
            message: {
                success: true,
                message: "Created Deduction successfully"
            },
        })
    }
    catch (err){
        res.status(500).json({ status: "failed", message: err?.message })
    }
}



export const getAllDeductionTypes = async (req, res) => {
    try {
        const deductions = await DeductionType.find({});
        res.status(200).json({
            message: {
                success: true,
                data: deductions,
                message: "Fetched all deduction types successfully"
            }
        });
    } catch (err) {
        res.status(500).json({ status: "failed", message: err?.message });
    }
};





export const createEmployeeDeduction = async (req, res) => {
    try {
        const {
            employee_id,
            deductionTypeId,
            is_percentage,
            amount,
            percentage,
            start_date,
            end_date,
            reason,
        } = req.body;

        const deduction = new EmployeeDeduction({
            employee_id,
            deductionTypeId,
            is_percentage,
            amount,
            percentage,
            start_date,
            end_date,
            reason,
        });
        await deduction.save();

        res.status(200).json({
            message: {
                success: true,
                message: "Employee Deduction created successfully",
                data:deduction
            },
        });
    } catch (err) {
        res.status(500).json({ status: "failed", message: err?.message });
    }
};



export const getAllEmployeeDeductionTypes = async (req, res) => {
    try {
        const employeeDeductions = await EmployeeDeduction.find({});
        res.status(200).json({
            message: {
                success: true,
                data: employeeDeductions,
                message: "Fetched all deduction types successfully"
            }
        });
    } catch (err) {
        res.status(500).json({ status: "failed", message: err?.message });
    }
};


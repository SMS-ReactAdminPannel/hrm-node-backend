import { PayrollModel } from "../../../models/HR/Payroll/models/PayrollRecordModel.js";
import SalaryStructureModel from "../../../models/HR/Payroll/models/SalaryStructureModel.js";

// ✅ Create Payroll Entry
export const PayrollCreate = async (req, res) => {
  try {
    const value = req.body;

    const newPayroll = new PayrollModel({ ...value });
    await newPayroll.save();

    return res.status(201).send({
      success: true,
      message: "New Payroll Created Successfully",
      data: newPayroll,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ✅ Get All Payrolls (excluding deleted)
export const PayrollGetAll = async (req, res) => {
  try {
    const allPayrolls = await PayrollModel.find({ is_deleted: false });
    return res.status(200).send({
      success: true,
      data: allPayrolls,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ✅ Get Single Payroll by ID
export const PayrollGetOne = async (req, res) => {
  try {
    const { id } = req.params;
    const payroll = await PayrollModel.findOne({ _id: id, is_deleted: false });

    if (!payroll) {
      return res.status(404).send({
        success: false,
        message: "Payroll not found",
      });
    }

    return res.status(200).send({
      success: true,
      data: payroll,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ✅ Update Payroll Entry by ID
export const PayrollUpdateWithUUID = async (req, res) => {
  try {
    const { id } = req.params;
    const value = req.body;

    const updatedPayroll = await PayrollModel.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { ...value },
      { new: true }
    );

    if (!updatedPayroll) {
      return res.status(404).send({
        success: false,
        message: "Payroll not found or has been deleted",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Payroll updated successfully",
      data: updatedPayroll,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ✅ Soft Delete Payroll Entry
export const PayrollDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPayroll = await PayrollModel.findOneAndUpdate(
      { _id: id },
      { is_deleted: true },
      { new: true }
    );

    if (!deletedPayroll) {
      return res.status(404).send({
        success: false,
        message: "Payroll not found or already deleted",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Payroll deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ✅ Process Payroll for All Active Employees
export const ProcessPayroll = async (req, res) => {
  try {
    const employees = await SalaryStructureModel.find({ isActive: true }).populate("employee");

    const payrolls = [];

    for (const record of employees) {
      const {
        employee,
        netSalary,
      } = record;

      const newPayroll = new PayrollModel({
        employee_name: `${employee.first_name} ${employee.last_name || ""}`,
        position_name: employee.role,
        department_name: employee.department?.name || "N/A",
        salary: netSalary,
      });

      await newPayroll.save();
      payrolls.push(newPayroll);
    }

    return res.status(201).json({
      success: true,
      message: "Payroll processed for all active employees",
      data: payrolls,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to process payroll",
      error: err.message,
    });
  }
};

  
import { DepartmentModel } from "../../../models/HR/Department/index.js";


// ✅ Create Department
export const DepartmentCreate = async (req, res) => {
    try {
        const {
            name,
            description,
            subDescription,
            total_employee,
            image
        } = req.body;

        // if (!id || !department_name) {
        //     return res.status(400).send({
        //         success: false,
        //         message: "ID and Department Name are required",
        //     });
        // }

        const newDepartment = new DepartmentModel({
            name,
            description,
            subDescription,
            total_employee,
            image
        });

        await newDepartment.save();

        return res.status(201).send({
            success: true,
            message: "New Department Created Successfully",
            data: newDepartment,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// ✅ Update Department
export const DepartmentUpdateWithUUID = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedDepartment = await DepartmentModel.findOneAndUpdate(
            { _id: id, is_deleted: false },
            updateData,
            { new: true }
        );

        if (!updatedDepartment) {
            return res.status(404).send({
                success: false,
                message: "Department not found or already deleted",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Department updated successfully",
            data: updatedDepartment,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// ✅ Get Single Department
export const DepartmentGetOne = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await DepartmentModel.findOne({
            _id: id,
            is_deleted: false
        });

        if (!department) {
            return res.status(404).send({
                success: false,
                message: "Department not found",
            });
        }

        return res.status(200).send({
            success: true,
            data: department,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// ✅ Get All Departments (excluding deleted)
export const DepartmentGetAll = async (req, res) => {
    try {
        const departments = await DepartmentModel.find({ is_deleted: false });

        return res.status(200).send({
            success: true,
            data: departments,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// ✅ Soft Delete Department
export const DepartmentDelete = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDepartment = await DepartmentModel.findOneAndUpdate(
            { _id: id, is_deleted: false },
            { is_deleted: true },
            { new: true }
        );

        if (!deletedDepartment) {
            return res.status(404).send({
                success: false,
                message: "Department not found or already deleted",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Department soft deleted successfully",
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

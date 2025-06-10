import { DepartmentModel } from "../../../models/HR/Department/index.js";

export const DepartmentGetOne = async (req, res) =>{
    try{
         const { id } = req.params;
        const Department = await DepartmentModel.findOne({ _id:id, is_deleted: false });

        if (!Department) {
            return res.status(404).send({
                success: false,
                message: "Department not found",
            });
        }
        return res.status(200).send({
            success: true,
            data: Department,
        });
        } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
    };
     export const DepartmentGetAll = async (req, res) => {
        try {
            const Department = await DepartmentModel.find({ is_deleted: false });
    
            return res.status(200).send({
                success: true,
                data: Department,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };
     export const DepartmentDelete = async (req,res) => {
            try {
                const { id } = req.params;
        
                const deletedPart = await DepartmentModel.findOneAndDelete(
                    { _id:id, },
                    { is_deleted: true },
                    { new: true }
                );
        
                if (!deletedPart) {
                    return res.status(404).send({
                        success: false,
                        message: "Department not found or already deleted",
                    });
                }
        
                return res.status(200).send({ 
                    success: true,
                    message: "Department deleted successfully",
                });
            } catch (error) {
                return res.status(500).send({
                    success: false,
                    message: "Something went wrong",
                    error: error.message,
                });
            }
        };
        
        
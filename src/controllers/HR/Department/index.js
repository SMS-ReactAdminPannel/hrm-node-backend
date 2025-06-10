import { DepartmentModel } from "../../../models/HR/Department/index.js";


export const DepartmentCreate = async (req, res)=>{
    try{
        const value=req.body;
        
        const newDepartment=new DepartmentModel({
            ...value,
            
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

 export const DepartmentUpdateWithUUID = async (req,res) => {
        try {
            const { id } = req.params;
            const value = req.body;
    
            const updatedPart = await DepartmentModel.findOneAndUpdate(
                { _id:id, is_deleted: false },
                {
                    ...value,
                    
                },
                { new: true }
            );
    
            if (!updatedPart) {
                return res.status(404).send({
                    success: false,
                    message: "Department not found or has been deleted",
                });
            }
    
            return res.status(200).send({
                success: true,
                message: "Department updated successfully",
                data: updatedPart,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };
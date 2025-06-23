import { LeaveModel } from "../../../models/HR/Leave/index.js";

export const LeaveCreate = async (req, res)=>{
    try{
        const value=req.body;
        
        const newLeave=new LeaveModel({
            ...value,
           
        });
        await newLeave.save();
         return res.status(201).send({
            success: true,
            message: "New Leave Created Successfully",
            data: newLeave,
        });
        } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
export const LeaveGetOne = async (req, res) =>{
    try{
         const { id } = req.params;
        const Leave = await LeaveModel.findOne({ _id:id, is_deleted: false });

        if (!Leave) {
            return res.status(404).send({
                success: false,
                message: "Leave not found",
            });
        }
        return res.status(200).send({
            success: true,
            data: Leave,
        });
        } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
    };
    export const LeaveUpdateWithUUID = async (req,res) => {
        try {
            const { id } = req.params;
            const value = req.body;
            
            const updatedPart = await LeaveModel.findOneAndUpdate(
                { _id:id, is_deleted: false },
                {
                    ...value,
                    
                },
                { new: true }
            );
    
            if (!updatedPart) {
                return res.status(404).send({
                    success: false,
                    message: "Leave not found or has been deleted",
                });
            }
    
            return res.status(200).send({
                success: true,
                message: "Leave updated successfully",
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
    
    export const LeaveDelete = async (req,res) => {
        try {
            const { id } = req.params;
    
            const deletedPart = await LeaveModel.findOneAndDelete(
                { _id:id, },
                { is_deleted: true },
                { new: true }
            );
    
            if (!deletedPart) {
                return res.status(404).send({
                    success: false,
                    message: "Leave not found or already deleted",
                });
            }
    
            return res.status(200).send({ 
                success: true,
                message: "Leave deleted successfully",
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };
    
    
    
    



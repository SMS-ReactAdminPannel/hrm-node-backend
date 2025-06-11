import { PayrollModel } from "../../../models/HR/Payroll/index.js";

export const PayrollCreate = async (req, res)=>{
    try{
        const value=req.body;
        
        const newPayroll=new PayrollModel({
            ...value,
           
        });
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
export const PayrollGetOne = async (req, res) =>{
    try{
         const { id } = req.params;
        const Payroll = await PayrollModel.findOne({ _id:id, is_deleted: false });

        if (!Payroll) {
            return res.status(404).send({
                success: false,
                message: "Payroll not found",
            });
        }
        return res.status(200).send({
            success: true,
            data: Payroll,
        });
        } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
    };
    export const PayrollUpdateWithUUID = async (req,res) => {
        try {
            const { id } = req.params;
            const value = req.body;
            
            const updatedPart = await PayrollModel.findOneAndUpdate(
                { _id:id, is_deleted: false },
                {
                    ...value,
                    
                },
                { new: true }
            );
    
            if (!updatedPart) {
                return res.status(404).send({
                    success: false,
                    message: "Payroll not found or has been deleted",
                });
            }
    
            return res.status(200).send({
                success: true,
                message: "Payroll updated successfully",
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
    
    export const PayrollDelete = async (req,res) => {
        try {
            const { id } = req.params;
    
            const deletedPart = await PayrollModel.findOneAndDelete(
                { _id:id, },
                { is_deleted: true },
                { new: true }
            );
    
            if (!deletedPart) {
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
    
    
    
    



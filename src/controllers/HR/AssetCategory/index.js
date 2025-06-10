import { AssetCategoryModel } from "../../../models/HR/AssetCategory/index.js";

export const AssetCategoryCreate = async (req, res)=>{
    try{
        const value=req.body;
        
        const newAssetCategory=new AssetCategoryModel({
            ...value,
            
        });
        await newAssetCategory.save();
         return res.status(201).send({
            success: true,
            message: "New AssetCategory Created Successfully",
            data: newAssetCategory,
        });
        } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
export const AssetCategoryGetOne = async (req, res) =>{
    try{
         const { id } = req.params;
        const AssetCategory = await AssetCategoryModel.findOne({ _id:id, is_deleted: false });

        if (!AssetCategory) {
            return res.status(404).send({
                success: false,
                message: "AssetCategory not found",
            });
        }
        return res.status(200).send({
            success: true,
            data: AssetCategory,
        });
        } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
    };
     export const AssetCategoryGetAll = async (req, res) => {
        try {
            const AssetCategory = await AssetCategoryModel.find({ is_deleted: false });
    
            return res.status(200).send({
                success: true,
                data: AssetCategory,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };
    export const AssetCategoryUpdateWithUUID = async (req,res) => {
        try {
            const { id } = req.params;
            const value = req.body;
    
            const updatedPart = await AssetCategoryModel.findOneAndUpdate(
                { _id:id, is_deleted: false },
                {
                    ...value,
                    
                },
                { new: true }
            );
    
            if (!updatedPart) {
                return res.status(404).send({
                    success: false,
                    message: "AssetCategory not found or has been deleted",
                });
            }
    
            return res.status(200).send({
                success: true,
                message: "AssetCategory updated successfully",
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
    
    export const AssetCategoryDelete = async (req,res) => {
        try {
            const { id } = req.params;
    
            const deletedPart = await AssetCategoryModel.findOneAndDelete(
                { _id:id, },
                { is_deleted: true },
                { new: true }
            );
    
            if (!deletedPart) {
                return res.status(404).send({
                    success: false,
                    message: "AssetCategory not found or already deleted",
                });
            }
    
            return res.status(200).send({
                success: true,
                message: "AssetCategory deleted successfully",
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };
import { AnnouncementModel } from "../../../models/HR/Annoncement/index.js";

export const AnnouncementCreate = async (req, res)=>{
    try{
        const value=req.body;
        
        const newAnnouncement=new AnnouncementModel({
            ...value,
           
        });
        await newAnnouncement.save();
         return res.status(201).send({
            success: true,
            message: "New Announcement Created Successfully",
            data: newAnnouncement,
        });
        } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
export const AnnouncementGetOne = async (req, res) =>{
    try{
         const { id } = req.params;
        const Announcement = await AnnouncementModel.findOne({ _id:id, is_deleted: false });

        if (!Announcement) {
            return res.status(404).send({
                success: false,
                message: "Announcement not found",
            });
        }
        return res.status(200).send({
            success: true,
            data: Announcement,
        });
        } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
    };
     export const AnnouncementGetAll = async (req, res) => {
        try {
            const Announcement = await AnnouncementModel.find({ is_deleted: false });
    
            return res.status(200).send({
                success: true,
                data: Announcement,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };
    export const AnnouncementUpdateWithUUID = async (req,res) => {
        try {
            const { id } = req.params;
            const value = req.body;
            
            const updatedPart = await AnnouncementModel.findOneAndUpdate(
                { _id:id, is_deleted: false },
                {
                    ...value,
                    
                },
                { new: true }
            );
    
            if (!updatedPart) {
                return res.status(404).send({
                    success: false,
                    message: "Announcement not found or has been deleted",
                });
            }
    
            return res.status(200).send({
                success: true,
                message: "Announcement updated successfully",
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
    
    export const AnnouncementDelete = async (req,res) => {
        try {
            const { id } = req.params;
    
            const deletedPart = await AnnouncementModel.findOneAndDelete(
                { _id:id, },
                { is_deleted: true },
                { new: true }
            );
    
            if (!deletedPart) {
                return res.status(404).send({
                    success: false,
                    message: "Announcement not found or already deleted",
                });
            }
    
            return res.status(200).send({ 
                success: true,
                message: "Announcement deleted successfully",
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };
    
    
    
    



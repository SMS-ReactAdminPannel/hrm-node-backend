import mongoose from "mongoose";
import { v4 as uuid, v4 } from "uuid"
const AnnouncementSchema = mongoose.Schema({
    id: {
        type: String
    },
    title_name:{
        type:String
    },
    start_date:{
      type:String,
      default:Date.now()
    },
    end_date:{
      type:String,
      default:Date.now()
    },
    uuid: {
        type: String,
        required: false,
        unique: true,
        default: uuid
      },
    description:{
        type:String
    },
    
     is_active: {
        type: Boolean,
        default: true,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    
    
    },{timestamps: true});
    export const AnnouncementModel = mongoose.model("Announcementmodel",AnnouncementSchema)
        



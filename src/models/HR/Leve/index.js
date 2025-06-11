import mongoose from "mongoose";
import { v4 as uuid, v4 } from "uuid"
const LeaveSchema = mongoose.Schema({
    id: {
        type: String
    },
    employee_name:{
        type:String
    },
     leave_type:{
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
    total_days:{
        type:Number
    },
    uuid: {
        type: String,
        required: false,
        unique: true,
        default: uuid
      },
    reason:{
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
    export const LeaveModel = mongoose.model("Leavemodel",LeaveSchema)
        



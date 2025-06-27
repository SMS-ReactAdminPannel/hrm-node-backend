import mongoose from "mongoose"
import {v4 as uuid, v4} from "uuid"

const GrievanceSchema = mongoose.Schema({

    title:{
        type:String
    },

    description:{
        type:String
    },
    
    status:{
        type:String,
    },

    employee:{
        type:String
    },

    empid:{
        type:String,
    },

    uuid:{
        type:String,
        required:false,
        unique:true,
        default:uuid
    },
    mail:{
        type:String
    },
    department:{
        type:String
    },

    role:{
        type:String,
    },
  
     date:{
        type:String,
    }, 
    is_active:{
        type:Boolean,
        default:true,
    },
    is_deleted:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

export const GrievanceModel = mongoose.model("Grienvancemodel",GrievanceSchema)
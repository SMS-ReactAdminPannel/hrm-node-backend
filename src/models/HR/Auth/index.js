import mongoose from "mongoose";
import {v4 as uuid} from "uuid"
const HrSchema = new mongoose.Schema({
    id: {type: String, },
    uuid: {type: String,default:uuid},
    first_name:{type:String, required:false},
    last_name:{type:String,required:false},
    user_name:{type:String,required:false},
    password:{type:String,required:true},
    phone_number:{type:Number,required:true},
    email:{type:String,required:true},
    role:{type:String,default:"hr"},
    is_active:{type:Boolean,required:true,default:true},
    is_delete:{type:Boolean,required:true,default:false},
    is_two_auth_complted:{type:Boolean,required:true,default:false},
    is_two_auth_completed_at:{type:Boolean,required:true,default:false},
    first_time_login:{type:Boolean,required:true,default:false},
    Image:{type:String,default:null}


})
export const userHRSchema = mongoose.model("userHR", HrSchema)
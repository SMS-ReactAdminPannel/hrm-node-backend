import mongoose from "mongoose"
import { v4 as uuid } from "uuid"
const Schema = mongoose.Schema
import validator from "validator"

const employeeSchema = new mongoose.Schema({
    id:{
        type:Number,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    uuid:{
        type:Number,
        default: uuid,
    },
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
    },
    username:{
        type:String,
    },
    phone_number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email" +value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is too weak" +value)
            }
        }
    },
    role:{
        type:String,
        default:"employee"
    },
    image:{
        type:String,
        default:null
    },
    is_active:{
        type:Boolean,
        default:true
    },
    is_delete:{
        type:Boolean,
        default:false
    },
    is_two_auth_completed:{
        type:Boolean,
        default:false
    },
    is_two_auth_completed_at:{
        type:Date,
        default:null
    },
    is_email_verified:{
        type:Boolean,
        default:false
    },
    first_time_login:{
        type:Boolean,
        default:false
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
      },
},{timestamps:true,});



export const employeeUser = mongoose.model("employeeUser", employeeSchema);
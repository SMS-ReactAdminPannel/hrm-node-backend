import mongoose from "mongoose";
import { v4 as uuid, v4 } from "uuid"
const PayrollSchema = mongoose.Schema({
    id: {
        type: String
    },
    employee_name:{
        type:String
    },
     position_name:{
        type:String
    },
     department_name:{
        type:String
    },
    uuid: {
        type: String,
        required: false,
        unique: true,
        default: uuid
      },
    total_employee:{
        type:String
    },
   salary:{
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
    export const PayrollModel = mongoose.model("Payrollmodel",PayrollSchema)
        



import mongoose from "mongoose";
import { v4 as uuid, v4 } from "uuid"
const DepartmentSchema = mongoose.Schema({
    id: {
        type: String
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
    image:{
        type: String,
        default:null
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
    export const DepartmentModel = mongoose.model("Departmentmodel",DepartmentSchema)
        



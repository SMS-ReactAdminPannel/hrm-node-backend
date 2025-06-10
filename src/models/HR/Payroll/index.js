import mongoose from "mongoose";
import { v4 as uuid, v4 } from "uuid"
const PayrollSchema = mongoose.Schema({
    id: {
        type: String
    },
    employee_id:{
        type:String
    },
    
     month:{
        type:String
    },
    uuid: {
        type: String,
        required: false,
        unique: true,
        default: uuid
      },
    year:{
        type:Number
    },
   grosssalary:{
        type:Number
   },
   netsalary:{
        type:Number
   },
   deduction:{
       pf: Number,
    tax:Number,
    others:Number
   },
  bonuses:[
    {
    amount:Number,
    reason:String,
    date:{type:Date,default:Date.now}
    }
  ],
  createAt:{
    type:Date,
    default:Date.now
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
   
        




import mongoose from "mongoose";
import {v4 as uuid} from "uuid";
const AppraisalSchema = new mongoose.Schema({
    uuid:{type:String,default:uuid},
    is_active:{type:Boolean,required:true,default:true},
    is_delete:{type:Boolean,required:true,default:false},
    // employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },  // Employee being appraised
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserHR' },// HR who created the appraisal
    ProjectPeriod:  { type: String, required: true },
    Employee:{type: String},
      Position: { type: String, required: true },
      description: { type: String },
      employeeSelfRating: { type: Number, min: 1, max: 5, }, 
      managerRating: { type: Number, min: 1, max: 5 },
      Comments: { type: String },
    Rating: { type: Number, min: 0 , },
    incrementRecommendation: { type: Number, min: 0 },   // % or absolute amount, depending on your plan
    bonusRecommendation: { type: Number, min: 0 },
     Status: {type: String,
    enum: ['Draft', 'SelfReview', 'ManagerReview', 'Finalized'],
    default: 'Draft'
    },
    createdAt: { type: Date, default: Date.now }
   });

    export const EmployeeAppraisalSchema  = mongoose.model('Appraisal', AppraisalSchema);

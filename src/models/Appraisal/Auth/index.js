import { object, string } from "joi";
import mongoose from "mongoose";

const AppraisalSchema=new mongoose.Schema({
    employee_id: {
        type: String,
    },
    appraisal_text1:{
        type:String,
    },
    appraisal_text1_rate:{
        type:number,
    },
    appraisal_text2:{
        type:String,
    },
    appraisal_text2_rate:{
        type:number,
    },
    appraisal_text3:{
        type:String,
    },
    appraisal_text3_rate:{
        type:number,
    },
    appraisal_text4:{
        type:String,
    },
    appraisal_text4_rate:{
        type:number,
    },
    appraisal_text5:{
        type:String,
    },
    appraisal_text5_rate:{
        type:number,
    },
    Rate_appraisal:{
        type:number,
    },
    Status:{
        type:String,
    },
    

})

export const AppraisalModel = mongoose.model("Appraisal", AppraisalSchema);
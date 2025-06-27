import { AppraisalModel } from "../../../models/Appraisal/Auth"

export const AppraisalEdit= async (req,res)=>{
    try {
        const{
            empolyee_id,
            appraisal_text1,
            appraisal_text2,
            appraisal_text3,
            appraisal_text4,
            appraisal_text5,
            appraisal_text1_rate,
            appraisal_text2_rate,
            appraisal_text3_rate,
            appraisal_text4_rate,
            appraisal_text5_rate,
            Rate_appraisal,

        }=req.body

         appraisalGet=new AppraisalModel({
            empolyee_id,
            appraisal_text1,
            appraisal_text2,
            appraisal_text3,
            appraisal_text4,
            appraisal_text5,
            appraisal_text1_rate,
            appraisal_text2_rate,
            appraisal_text3_rate,
            appraisal_text4_rate,
            appraisal_text5_rate,
            Rate_appraisal,
        })
        
        const appraisalGet=await AppraisalModel.findOne(empolyee_id);
        await appraisalGet.save();
        res.status(200).send("saved")


         
    } catch (error) {
       res.status(500).send("ERROR : " + error.message);
    }
}

export const AppraisalView=async (req,req)=>{
    try {
        const {
            empolyee_id,
            appraisal_text1,
            appraisal_text2,
            appraisal_text3,
            appraisal_text4,
            appraisal_text5,
            appraisal_text1_rate,
            appraisal_text2_rate,
            appraisal_text3_rate,
            appraisal_text4_rate,
            appraisal_text5_rate,
            Rate_appraisal,
        }=req.body

        appraisalViewPost=new AppraisalModel({
            empolyee_id,
            appraisal_text1,
            appraisal_text2,
            appraisal_text3,
            appraisal_text4,
            appraisal_text5,
            appraisal_text1_rate,
            appraisal_text2_rate,
            appraisal_text3_rate,
            appraisal_text4_rate,
            appraisal_text5_rate,
            Rate_appraisal,
        })
        appraisalPost=new AppraisalModel({
            empolyee_id,
            Rate_appraisal,

        })

        const appraisalPost=await AppraisalModel.populate()
        



    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
    }
}
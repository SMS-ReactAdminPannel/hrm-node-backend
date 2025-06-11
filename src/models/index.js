import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email : { type: String },
    otp : {type : String , },
    token : {type : String , required : true}, 
    validated: { type: Boolean, default: false },
    is_active : {type : Boolean ,default : true},
    is_delete : {type : Boolean , default : false},
    type : { type: String ,default : null},
    attempt:{type:Number,default:1},
    createdAt:{type : Date,expires:600,default:Date.now()},
    expiryDate:{type: Date, default: () => new Date(Date.now() + 10 * 60 * 1000)}
})

OtpSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

export const Otps = mongoose.model("Otps",OtpSchema)


const TokenSchema = new mongoose.Schema({
    email:{type:String,required:true},
     token:{type:String,required:true},
     createdAt: { type: Date, expires: '1d', default: Date.now },
   
})

export const Tokens = mongoose.model("Tokens",TokenSchema)
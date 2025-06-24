import{GuestAuthSchema} from "../../../validations/index.js";
import bcrypt from "bcryptjs";
import { generateOtp } from "../../utils/helpers/helpers.js";
import { Otps } from "../../models/index.js";

export const GuestSignUp = async (req, res) => {
  try {
    const {
     first_name,
      last_name,
      email,
      phone_number,
      password,
      role,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new GuestAuthSchema({
      first_name,
      last_name,
      email,
      phone_number,
      password: passwordHash,
      role,
    });
    const { otp, token } = await generateOtp();
    await Otps.create({otp,token,email})
    
    await user.save();
    res.status(200).json({
      message: {
        success: true,
        message: "User added successfully"
      },
      otp,
      token,email
    })
  } catch (err) {
    res.status(500).json({ status: "failed", message: err?.message })
  }
}



export const GuestLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await GuestAuthSchema.findOne({ email: email });
    if (!user) {
      throw new Error('EmailId is Not valid')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.status(200).json({
        success: true,
        message: "Login successfully"
      })
    }
    else {
      throw new Error("Password is Incorrect")
    }

  } catch (err) {
    res.status(400).send("ERROR : " + err.message)
  }
}

export const GuestValidateOTP = async (req,res)=>{
  try{
    const {email,otp,token} = req.body;

    const user = await GuestAuthSchema.find({email:email, otp:otp, token:token})
    if (!user) {
      throw new Error('OTP not validated...')
    }
    res.status(200).json({
        success: true,
        message: "OTP validated Successfully..."
      })
  }
  catch(err){
    res.status(500).send("ERROR : " + err.message)
  }
}
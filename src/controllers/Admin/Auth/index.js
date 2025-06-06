// import { generate } from "otp-generator"; // (optional, if generateOtp uses it internally)
import { AdminModel } from "../../../models/Admin/Auth/index.js";
import { generateOtp, sentOtpEmail } from "../../../utils/helpers/helpers.js";
import bcrypt from "bcryptjs"; // Needed for password hashing
import Validations from "../../../validations/index.js";
import { Otps } from "../../../models/index.js";


//Signup
export const AdminSignup = async (req, res) => {
  try {
    // Validate input
    const { first_name, last_name, username, password, phonenumber, email } =
      Validations.AdminSchemavalidate(req.body); // Should return validated fields

    //  Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // fixed function call

    //  Create new user
    const user = new AdminModel({
      first_name,
      last_name,
      username,
      password: hashedPassword,
      phonenumber,
      email,
    });

    const { otp, token } = await generateOtp();
    await Otps.create({ otp, email, token });

    await user.save();

    
    // // await sentOtpEmail(email, otp, token);

    //  Respond to frontend
    res.status(200).json({
      status: "Success",
      message: "User Saved Successfully",
      data: {
        token,
        otp,
        email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      status: "Failed",
      message: "User Failed to Saved",
      error: error.message,
    });
  }
};


//login
export const AdminLogin = async (req, res) => {
  try {
    const { value, error } = Validations.AdminLoginValidate.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const { email, password } = value;

    const user = await AdminModel.findOne({ email: email });
    if (!user) {
      throw new Error("EmailId is Not valid");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.status(200).json({
        success: true,
        message: "Login successfully",
      });
    } else {
      throw new Error("Password is Incorrect");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

//verify OTP
export const AdminvalidateOTP = async (req,res)=>{
    try{
        const {email,otp,token} = req.body;

        const user = await AdminModel.find({email:email, otp:otp, token:token})
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
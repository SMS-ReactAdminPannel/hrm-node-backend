// import { generate } from "otp-generator"; // (optional, if generateOtp uses it internally)
import { AdminModel } from "../../../models/Admin/Auth/index.js";
import {
  generateOtp,
  generateUUID,
  sentOtpEmail,
} from "../../../utils/helpers/helpers.js";
import bcrypt from "bcryptjs"; // Needed for password hashing
import Validations from "../../../validations/index.js";
import { Otps } from "../../../models/index.js";

//Signup
export const AdminSignup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      password,
      phonenumber,
      email,
    } = Validations.AdminSchemavalidate(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = await generateUUID();

    const user = new AdminModel({
      uuid,
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

    await sentOtpEmail(email, otp); // optional: remove if not needed

    res.status(200).json({
      status: "Success",
      message: "User Saved Successfully",
      data: { token, otp, email },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      status: "Failed",
      message: "User Failed to Save",
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
export const AdminvalidateOTP = async (req, res) => {
  try {
    const { email, otp, token } = req.body;

    const otpEntry = await Otps.findOne({ email, otp, token });
    if (!otpEntry) {
      throw new Error("OTP not validated...");
    }
    res.status(200).json({
      success: true,
      message: "OTP validated Successfully...",
    });
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
};

// Resend OTP
export const AdminResendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "No user found with this email",
      });
    }
    const { otp, token } = await generateOtp();
    await Otps.findOneAndUpdate(
      { email },
      { otp, token },
      { upsert: true, new: true }
    );
    res.status(200).json({
      status: "Success",
      message: "OTP resent successfully",
      data: {
        token,
        otp,
        email,
      },
    });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({
      status: "Failed",
      message: "Could not resend OTP",
      error: error.message,
    });
  }
};

//Forgot password
export const AdminForgotPassword = async (req, res) => {
  try {
    // Validate request body
    const { value, error } = Validations.AdminForgotPasswordValidate.validate(
      req.body
    );
    if (error) throw new Error(error.details[0].message);

    const { email } = value;

    // Check if user exists
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "No account found with this email",
      });
    }

    // Generate OTP + token
    const { otp, token } = await generateOtp();

    // Store OTP and token in the database (update or insert)
    await Otps.findOneAndUpdate(
      { email },
      { otp, token },
      { upsert: true, new: true }
    );

    // Optional: Send OTP via email
    // await sentOtpEmail(email, otp);

    return res.status(200).json({
      status: "Success",
      message: "OTP sent to email for password reset",
      data: { email, otp, token },
    });
  } catch (err) {
    console.error("Forgot Password Error:", err.message);
    return res.status(500).json({
      status: "Failed",
      message: "Unable to send OTP",
      error: err.message,
    });
  }
};

//Reset password

export const AdminResetPassword = async (req, res) => {
  try {
    // Validate request body
    const { value, error } = Validations.AdminResetPasswordValidate.validate(
      req.body
    );
    if (error) throw new Error(error.details[0].message);

    const { email, token, newPassword } = value;

    // Check if OTP entry exists for this email & token
    const otpEntry = await Otps.findOne({ email, token });
    if (!otpEntry) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid or expired token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    const user = await AdminModel.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    // Optionally delete the OTP record
    await Otps.deleteOne({ email });

    return res.status(200).json({
      status: "Success",
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("Reset Password Error:", err.message);
    return res.status(500).json({
      status: "Failed",
      message: "Could not reset password",
      error: err.message,
    });
  }
};


//get Profile by UUID

export const AdmingetProfileByUUID = async (req, res) => {
  try {
    const { uuid } = req.params;

    const admin = await AdminModel.findOne({ uuid });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res
      .status(200)
      .json({ message: "Admin profile fetched", data: admin });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


//logout

export const AdminLogout = (req, res) => {
  // Since JWT is stateless, just respond OK and frontend should delete the token.
  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};


//Update Profile by UUID

export const AdminupdateProfile = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { first_name, last_name, phonenumber, image } = req.body;

    // Build an object only with fields that are defined (not undefined)
    const updateData = {};
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (phonenumber !== undefined) updateData.phonenumber = phonenumber;
    if (image !== undefined) updateData.image = image;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: "No valid fields provided to update",
      });
    }

    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { uuid },
      updateData,
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        status: "Failed",
        message: "Admin not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Admin profile updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};


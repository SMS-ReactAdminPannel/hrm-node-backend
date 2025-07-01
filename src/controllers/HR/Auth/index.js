import { generateOtp } from '../../../utils/helpers/helpers.js';
import bcrypt from 'bcryptjs';
import { Otps } from '../../../models/index.js';
import Validations from '../../../validations/index.js';
import { userHRSchema } from '../../../models/HR/Auth/index.js';


// HR Signup
export const HrSignup = async (req, res) => {
  try {
    const {
      email,
      // user_name,
      password,
      // first_name,
      // last_name,
      // phone_number,
    } = Validations.Hrschemavalidate(req.body);

    const hashed = await bcrypt.hash(password, 10);

    const user = new userHRSchema({
      email,
      // user_name,
      // first_name,
      // last_name,
      password: hashed,
      // phone_number,
    });

    await user.save();

    const { otp, token } = await generateOtp();
    await Otps.create({ otp, email, token });

    res.status(200).json({
      status: "success",
      message: "OTP sent successfully",
      data: { token, otp, email },
    });

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Signup failed",
      error: error.message,
    });
  }
};

// HR Signin
export const HrSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userHRSchema.findOne({ email });
    if (!user) throw new Error('EmailId is not valid');

    if (!user.password) throw new Error("Password not set for this user.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Password is incorrect");

    const { otp, token } = await generateOtp();
    await Otps.create({ otp, email, token });

    res.status(200).json({
      success: true,
      message: "Signin successfully",
      data: {email,otp,token}
    });

  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

// Validate OTP
export const validateOTP = async (req, res) => {
  try {
    const { email, otp, token } = req.body;

    const otpRecord = await Otps.findOne({ email, otp, token });
    if (!otpRecord) throw new Error('OTP not validated');

    res.status(200).json({
      success: true,
      message: "OTP validated successfully",
    });

  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
};

// Resend OTP
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userHRSchema.findOne({ email });
    if (!user) throw new Error("Email not registered.");

    const { otp, token } = await generateOtp();
    await Otps.create({ email, otp, token });

    res.status(200).json({
      success: true,
      message: "OTP resent successfully.",
      data: { email, otp, token },
    });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    // Validate input
    const { value, error } = Validations.HRForgotPasswordValidate.validate(req.body);
    if (error) return res.status(400).json({ status: "Failed", message: error.details[0].message });
    
    const { email } = value;

    // Check if user exists
    const user = await userHRSchema.findOne({ email });
    if (!user) return res.status(404).json({ status: "Failed", message: "No account found with this email" });

    // Generate OTP and token
    const { otp, token } = await generateOtp();

    // Save or update OTP in DB
    await Otps.findOneAndUpdate(
      { email },
      { otp, token, createdAt: new Date() }, // Add createdAt for future expiry features
      { upsert: true, new: true }
    );

    // TODO: Send OTP via email
    // await sendOtpEmail(email, otp);

    return res.status(200).json({
      status: "Success",
      message: "OTP sent to email for password reset",
      data: { email, otp, token }, // ⚠️ Remove otp/token in production
    });

  } catch (error) {
    console.error("Forgot Password Failed Error :", error);
    return res.status(500).json({ status: "Failed", message: "Internal server error", error: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    // Validate input
    const { value, error } = Validations.HRResetPasswordValidate.validate(req.body);
    if (error) return res.status(400).json({ status: "Failed", message: error.details[0].message });

    const { email, token, newPassword } = value;

    // Check if OTP/token exists
    const otpEntry = await Otps.findOne({ email, token });
    if (!otpEntry) return res.status(400).json({ status: "Failed", message: "Invalid or expired token" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in user schema
    const user = await userHRSchema.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) return res.status(404).json({ status: "Failed", message: "User not found" });

    // Delete OTP after successful reset
    await Otps.deleteOne({ email });

    return res.status(200).json({ status: "Success", message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ status: "Failed", message: "Internal server error", error: error.message });
  }
};

// Get HR Profile by UUID
export const HRgetProfileByUUID = async (req, res) => {
  try {
    const { uuid } = req.params;

    const hr = await userHRSchema.findOne({ uuid });

    if (!hr) {
      return res.status(404).json({ message: "HR not found" });
    }

    return res
      .status(200)
      .json({ message: "HR profile fetched", data: hr });
  } catch (error) {
    console.error("Error fetching HR profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout
export const HRLogout = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};

// Update HR Profile by UUID
export const HRupdateProfile = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { first_name, last_name, phone_number, image } = req.body;

    const updateData = {};
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (phone_number !== undefined) updateData.phone_number = phone_number;
    if (image !== undefined) updateData.image = image;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: "No valid fields provided to update",
      });
    }

    const updatedHR = await userHRSchema.findOneAndUpdate(
      { uuid },
      updateData,
      { new: true }
    );

    if (!updatedHR) {
      return res.status(404).json({
        status: "Failed",
        message: "HR not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "HR profile updated successfully",
      data: updatedHR,
    });
  } catch (error) {
    console.error("Error updating HR profile:", error);
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};

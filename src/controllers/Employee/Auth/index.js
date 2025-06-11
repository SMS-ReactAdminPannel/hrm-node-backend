import { employeeUser } from "../../../models/Employee/index.js";
import bcrypt from "bcryptjs";
import { generateOtp } from "../../../utils/helpers/helpers.js";
import { Otps } from "../../../models/index.js";

export const signUp = async (req, res) => {
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

        const user = new employeeUser({
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



export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await employeeUser.findOne({ email: email });
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

export const validateOTP = async (req, res) => {
  try {
    const { email, otp, token } = req.body;

    const otpRecord = await Otps.findOne({ email, otp, token });

    if (!otpRecord) {
      throw new Error('OTP not validated...');
    }

    res.status(200).json({
      success: true,
      message: "OTP validated Successfully..."
    });
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
};



export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const { otp, token } = await generateOtp();

        await Otps.findOneAndUpdate(
            { email },
            { otp, token, }
        );

        res.status(200).json({
            success: true,
            message: "OTP resent successfully",
            otp,
            token,
            email
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to resend OTP: " + err.message
        });
    }
};


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await employeeUser.findOne({ email:email });
        if (!user) {
            throw new Error("Email not registered");
        }

        const { otp, token } = await generateOtp();

        await Otps.findOneAndUpdate(
            { email },
            { otp, token }
        );

        res.status(200).json({
            success: true,
            message: "OTP sent to your Email",
            otp,
            token,
            email
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to resend OTP: " + err.message
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, token, newPassword, confirmPassword } = req.body;

        const user = await employeeUser.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with the provided email"
            });
        }

        const otpRecord = await Otps.findOne({ email, otp, token });
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP/token"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await employeeUser.findOneAndUpdate(
            { email },
            { password: hashedPassword }
        );

        res.status(200).json({
            success: true,
            message: "Password has been reset successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to reset password: " + err.message
        });
    }
};


export const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logout successful."
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Logout failed: " + err.message
        });
    }
};


export const getProfile = async (req, res) => {
    try {
        const {email} = req.body
        const user = await employeeUser.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with the provided email"
            });
        }
        res.send(user);
    }
    catch {
        res.status(400).send("Something Went wrong...!")
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { email } = req.body;

        const updates = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            role: req.body.role,
        };

        const updatedUser = await employeeUser.findOneAndUpdate(
            { email },
            { $set: updates },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found with the provided email",
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update profile: " + err.message,
        });
    }
};

 export const EmployeeGetAll = async (req, res) => {
        try {
            const Employee = await employeeUser.find({ is_active: true });
    
            return res.status(200).send({
                success: true,
                count: Employee.length,
                data: Employee,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };

    export const EmployeeDelete = async (req,res) => {
        try {
            const { id } = req.params;
    
            const deletedPart = await employeeUser.findOneAndDelete(
                { _id:id, },
                { is_deleted: true },
                { new: true }
            );
    
            if (!deletedPart) {
                return res.status(404).send({
                    success: false,
                    message: "Employee not found or already deleted",
                });
            }
    
            return res.status(200).send({ 
                success: true,
                message: "Employee deleted successfully",
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };


    
    export const EmployeeCreate = async (req, res)=>{
        try{
            const value=req.body;
            
            const newEmployee = new employeeUser({
                ...value,
               
            });
            await newEmployee.save();
             return res.status(201).send({
                success: true,
                message: "New Employee Created Successfully",
                data: newEmployee,
            });
            } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };
    

     export const EmployeeUpdateWithUUID = async (req,res) => {
            try {
                const { id } = req.params;
                const value = req.body;
                
                const updatedPart = await employeeUser.findOneAndUpdate(
                    { _id:id, is_active: true },
                    {
                        ...value,
                        
                    },
                    { new: true }
                );
        
                if (!updatedPart) {
                    return res.status(404).send({
                        success: false,
                        message: "Employee not found or has been deleted",
                    });
                }
        
                return res.status(200).send({
                    success: true,
                    message: "Employee updated successfully",
                    data: updatedPart,
                });
            } catch (error) {
                return res.status(500).send({
                    success: false,
                    message: "Something went wrong",
                    error: error.message,
                });
            }
        };
    
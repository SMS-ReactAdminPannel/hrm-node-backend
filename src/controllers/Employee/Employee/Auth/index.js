import { employeeUser } from "../../../../models/Employee/Employee/index.js";
import bcrypt from "bcryptjs";
import { generateOtp } from "../../../../utils/helpers/helpers.js";
import { Otps } from "../../../../models/index.js";
import { DepartmentModel } from "../../../../models/HR/Department/index.js";

// ✅ SIGNUP WITH DEPARTMENT
export const signUp = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            phone_number,
            password,
            role,
            departmentName,
        } = req.body;

        const department = await DepartmentModel.findOne({ name: departmentName });
        if (!department) {
            return res.status(400).json({
                success: false,
                message: "Invalid department name",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new employeeUser({
            first_name,
            last_name,
            email,
            phone_number,
            password: passwordHash,
            role,
            department: department._id,
        });

        const { otp, token } = await generateOtp();
        await Otps.create({ otp, token, email });

        await user.save();

        res.status(200).json({
            message: {
                success: true,
                message: "User added successfully",
            },
            otp,
            token,
            email,
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err?.message,
        });
    }
};

// ✅ LOGIN
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await employeeUser.findOne({ email });
        if (!user) {
            throw new Error('EmailId is not valid');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Password is incorrect');
        }

        res.status(200).json({
            success: true,
            message: "Login successfully",
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

// ✅ VALIDATE OTP
export const validateOTP = async (req, res) => {
    try {
        const { email, otp, token } = req.body;
        const otpRecord = await Otps.findOne({ email, otp, token });

        if (!otpRecord) {
            throw new Error('OTP not validated...');
        }

        res.status(200).json({
            success: true,
            message: "OTP validated successfully",
        });
    } catch (err) {
        res.status(500).send("ERROR: " + err.message);
    }
};

// ✅ RESEND OTP
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const { otp, token } = await generateOtp();

        await Otps.findOneAndUpdate({ email }, { otp, token });

        res.status(200).json({
            success: true,
            message: "OTP resent successfully",
            otp,
            token,
            email,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to resend OTP: " + err.message,
        });
    }
};

// ✅ FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await employeeUser.findOne({ email });
        if (!user) {
            throw new Error("Email not registered");
        }

        const { otp, token } = await generateOtp();
        await Otps.findOneAndUpdate({ email }, { otp, token });

        res.status(200).json({
            success: true,
            message: "OTP sent to your email",
            otp,
            token,
            email,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to resend OTP: " + err.message,
        });
    }
};

// ✅ RESET PASSWORD
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, token, newPassword, confirmPassword } = req.body;

        const user = await employeeUser.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with the provided email",
            });
        }

        const otpRecord = await Otps.findOne({ email, otp, token });
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP/token",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await employeeUser.findOneAndUpdate(
            { email },
            { password: hashedPassword }
        );

        res.status(200).json({
            success: true,
            message: "Password has been reset successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to reset password: " + err.message,
        });
    }
};

// ✅ LOGOUT
export const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logout successful.",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Logout failed: " + err.message,
        });
    }
};

// ✅ GET PROFILE
export const getProfile = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await employeeUser.findOne({ email }).populate("department");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with the provided email",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong: " + err.message,
        });
    }
};

// ✅ UPDATE PROFILE
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
    
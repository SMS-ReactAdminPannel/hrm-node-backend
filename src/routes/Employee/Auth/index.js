import express from "express"
import { forgotPassword, getProfile, Login, logout, resendOtp, resetPassword, signUp, updateProfile, validateOTP } from "../../../controllers/Employee/Auth/index.js";

const authEmployeeRoute = express.Router();

authEmployeeRoute.post("/", signUp)
authEmployeeRoute.post("/login", Login)
authEmployeeRoute.post("/validateOTP", validateOTP)
authEmployeeRoute.post("/resendOTP",resendOtp)
authEmployeeRoute.post("/forgotPassword",forgotPassword)
authEmployeeRoute.post("/resetPassword",resetPassword)
authEmployeeRoute.post("/logout",logout)
authEmployeeRoute.get("/getProfile",getProfile)
authEmployeeRoute.put("/updateProfile",updateProfile)
export default authEmployeeRoute;
import express from "express"
import { AdminForgotPassword, AdmingetProfileByUUID, AdminLogin, AdminLogout, AdminResendOTP, AdminResetPassword,
     AdminSignup, AdminupdateProfile, AdminvalidateOTP } from "../../../controllers/Admin/Auth/index.js"

const adminAuthRouter= express.Router()

adminAuthRouter.post('/', AdminSignup)

adminAuthRouter.get('/login',AdminLogin)

adminAuthRouter.post('/otp',AdminvalidateOTP)

adminAuthRouter.post('/resendotp',AdminResendOTP)

adminAuthRouter.post('/forgotpassword',AdminForgotPassword)

adminAuthRouter.post('/resetpassword',AdminResetPassword)

adminAuthRouter.post('/logout',AdminLogout)

adminAuthRouter.get('/profile/:uuid',AdmingetProfileByUUID)

adminAuthRouter.put('/update/:uuid',AdminupdateProfile)
export default adminAuthRouter
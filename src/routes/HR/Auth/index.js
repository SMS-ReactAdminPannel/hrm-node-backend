import express from 'express'
import { HrSignin, HrSignup, validateOTP, resendOtp, forgotPassword, resetPassword, HRLogout, HRgetProfileByUUID, HRupdateProfile } from '../../../controllers/HR/Auth/index.js'
const HrAuthRouter = express.Router()
HrAuthRouter.post('/signUp', HrSignup)
HrAuthRouter.post('/signin', HrSignin)
HrAuthRouter.post('/otp', validateOTP)
HrAuthRouter.post('/resend-otp', resendOtp)
HrAuthRouter.post('/forgot-password', forgotPassword)
HrAuthRouter.post('/reset-password', resetPassword)
HrAuthRouter.post('/logout', HRLogout)
HrAuthRouter.get('/profile/:uuid', HRgetProfileByUUID)
HrAuthRouter.put('/update/:uuid', HRupdateProfile)
export default HrAuthRouter


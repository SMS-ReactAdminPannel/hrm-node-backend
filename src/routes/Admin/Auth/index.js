import express from "express"
import { AdminLogin, AdminSignup, AdminvalidateOTP } from "../../../controllers/Admin/Auth/index.js"

const adminAuthRouter= express.Router()

adminAuthRouter.post('/', AdminSignup)

adminAuthRouter.get('/login',AdminLogin)

adminAuthRouter.post('/otp',AdminvalidateOTP)

export default adminAuthRouter
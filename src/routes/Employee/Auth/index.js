import express from "express"
import { Login, signUp, validateOTP } from "../../../controllers/Employee/index.js";

const authEmployeeRoute = express.Router();

authEmployeeRoute.post("/", signUp)
authEmployeeRoute.post("/login", Login)
authEmployeeRoute.post("/validateOTP", validateOTP)

export default authEmployeeRoute;
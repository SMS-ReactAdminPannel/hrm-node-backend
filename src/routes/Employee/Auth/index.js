import express from "express";
import {
  EmployeeCreate,
  EmployeeDelete,
  EmployeeGetAll,
  EmployeeUpdateWithUUID,
  forgotPassword,
  getProfile,
  Login,
  logout,
  resendOtp,
  resetPassword,
  signUp,
  updateProfile,
  validateOTP,
} from "../../../controllers/Employee/Auth/index.js";

const authEmployeeRoute = express.Router();

authEmployeeRoute.post("/", signUp);
authEmployeeRoute.post("/login", Login);
authEmployeeRoute.post("/validateOTP", validateOTP);
authEmployeeRoute.post("/resendOTP", resendOtp);
authEmployeeRoute.post("/forgotPassword", forgotPassword);
authEmployeeRoute.post("/resetPassword", resetPassword);
authEmployeeRoute.post("/logout", logout);
authEmployeeRoute.get("/getProfile", getProfile);
authEmployeeRoute.put("/updateProfile", updateProfile);
authEmployeeRoute.put("/updateProfileWithUUID/:id", EmployeeUpdateWithUUID);
authEmployeeRoute.delete("/deleteProfile/:id", EmployeeDelete);
authEmployeeRoute.post("/createProfile", EmployeeCreate);
authEmployeeRoute.get("/getAllProfile", EmployeeGetAll);
export default authEmployeeRoute;

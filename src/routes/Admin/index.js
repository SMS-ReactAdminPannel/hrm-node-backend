import express from "express"
import adminAuthRouter from "./Auth/index.js";

const AdminRouter = express.Router();
 
AdminRouter.use('/auth', adminAuthRouter)

export default AdminRouter;
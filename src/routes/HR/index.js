import express from "express"
import HrAuthRouter from "./Auth/index.js";
import Appraisalrouter from "./Appraisal/index.js";

const HrRouter = express.Router();

HrRouter.use('/auth',HrAuthRouter),
HrRouter.use('/Appraisal',Appraisalrouter)
export default HrRouter;
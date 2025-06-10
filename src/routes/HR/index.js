import express from "express"
import AssetCategoryRouter from "./AssetCategory/index.js";
import DepartmentRouter from "./Department/index.js";
import TimeSheetrouter from "./TimeSheet/index.js";


const HrRouter = express.Router();
HrRouter.use("/assetcategory",AssetCategoryRouter)
HrRouter.use("/department",DepartmentRouter)
HrRouter.use("/timesheet",TimeSheetrouter)



export default HrRouter;
import express from "express"
import { AssetCategoryCreate, AssetCategoryDelete, AssetCategoryGetAll, AssetCategoryGetOne, AssetCategoryUpdateWithUUID } from "../../../controllers/HR/AssetCategory/index.js";

const AssetCategoryRouter = express.Router();
AssetCategoryRouter.post("/create", AssetCategoryCreate)
AssetCategoryRouter.get("/get/:id",AssetCategoryGetOne)
AssetCategoryRouter.get("/getall",AssetCategoryGetAll)
AssetCategoryRouter.put("/update/:id",AssetCategoryUpdateWithUUID)
AssetCategoryRouter.delete("/delete/:id",AssetCategoryDelete)
export default AssetCategoryRouter
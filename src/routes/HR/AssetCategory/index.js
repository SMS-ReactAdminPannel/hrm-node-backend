import express from "express"
import { createAsset, createAssetCategory, deleteAsset, deleteAssetCategory, getAllAssetCategory, getAllAssets, getAssetById, getAssetCategoryById, updateAsset, updateAssetCategory } from "../../../controllers/HR/AssetCategory/index.js";


const AssetCategoryRouter = express.Router();
AssetCategoryRouter.post("/create", createAssetCategory)
AssetCategoryRouter.get("/getall",getAllAssetCategory)
AssetCategoryRouter.get("/get/:id",getAssetCategoryById)
AssetCategoryRouter.put("/update/:id",updateAssetCategory)
AssetCategoryRouter.delete("/delete/:id",deleteAssetCategory)

AssetCategoryRouter.post("/assetcreate", createAsset);
AssetCategoryRouter.get("/assetgetall", getAllAssets);
AssetCategoryRouter.get("/assetget/:id", getAssetById);
AssetCategoryRouter.put("/assetupdate/:id", updateAsset);
AssetCategoryRouter.delete("/assetdelete/:id", deleteAsset);
export default AssetCategoryRouter
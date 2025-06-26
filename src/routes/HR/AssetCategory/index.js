import express from "express"
import { createAsset, createAssetCategory, deleteAsset, deleteAssetCategory, getAllAsset, getAllAssetCategory, getAssetById, getAssetCategoryById, updateAsset, updateAssetCategory } from "../../../controllers/HR/AssetCategory/index.js";



const AssetPropertyRouter = express.Router();

AssetPropertyRouter.post("/create-assets", createAsset);
AssetPropertyRouter.get("/getall-assets", getAllAsset);
AssetPropertyRouter.get("/get-assets/:id", getAssetById);
AssetPropertyRouter.put("/update-assets/:id", updateAsset);
AssetPropertyRouter.delete("/delete-assets/:id", deleteAsset);

AssetPropertyRouter.post("/asset-categories", createAssetCategory);
AssetPropertyRouter.get("/getallasset-categories", getAllAssetCategory);
AssetPropertyRouter.get("/getasset-categories/:id", getAssetCategoryById);
AssetPropertyRouter.put("/updateasset-categories/:id", updateAssetCategory);
AssetPropertyRouter.delete("/deleteasset-categories/:id", deleteAssetCategory);

export default AssetPropertyRouter

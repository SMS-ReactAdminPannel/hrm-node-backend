import express from "express";
import {
  createAssetCategory,
  getAllAssetCategories,
  getAssetCategoryById,
  updateAssetCategory,
  deleteAssetCategory,
} from "../../../controllers/HR/AssetCategory/index.js";

const router = express.Router();

router.post("/", createAssetCategory);
router.get("/", getAllAssetCategories);
router.get("/:id", getAssetCategoryById);
router.put("/:id", updateAssetCategory);
router.delete("/:id", deleteAssetCategory);

export default router;

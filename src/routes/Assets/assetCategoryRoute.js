import express from "express";
import {
  
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../../controllers/assetCategoryController.js";
import { createAssetCategory } from "../../controllers/HR/AssetCategory/index.js";

const router = express.Router();

router.post("/", createAssetCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;

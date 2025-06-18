import { AssetCategoryModel } from "../../../models/HR/AssetCategory/index.js";

// ✅ CREATE
export const createAssetCategory = async (req, res) => {
  try {
    const newAssetCategory = new AssetCategoryModel({ ...req.body });
    await newAssetCategory.save();
    return res.status(201).send({
      success: true,
      message: "Asset category created successfully",
      data: newAssetCategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong while creating asset category",
      error: error.message,
    });
  }
};

// ✅ READ ALL
export const getAllAssetCategories = async (req, res) => {
  try {
    const categories = await AssetCategoryModel.find({ is_deleted: false });
    return res.status(200).send({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

// ✅ READ ONE
export const getAssetCategoryById = async (req, res) => {
  try {
    const category = await AssetCategoryModel.findOne({ _id: req.params.id, is_deleted: false });
    if (!category) {
      return res.status(404).send({ success: false, message: "Category not found" });
    }
    return res.status(200).send({ success: true, data: category });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching category",
      error: error.message,
    });
  }
};

// ✅ UPDATE
export const updateAssetCategory = async (req, res) => {
  try {
    const updated = await AssetCategoryModel.findOneAndUpdate(
      { _id: req.params.id, is_deleted: false },
      { ...req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).send({
        success: false,
        message: "Category not found or has been deleted",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

// ✅ DELETE (Soft Delete)
export const deleteAssetCategory = async (req, res) => {
  try {
    const deleted = await AssetCategoryModel.findOneAndUpdate(
      { _id: req.params.id, is_deleted: false },
      { is_deleted: true },
      { new: true }
    );
    if (!deleted) {
      return res.status(404).send({
        success: false,
        message: "Category not found or already deleted",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};

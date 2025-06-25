
import mongoose from "mongoose";
import { AssetCategoryModel, AssetModel } from "../../../models/HR/AssetCategory/index.js";



// Create Asset
export const createAsset = async (req, res) => {
      const { asset_name, description,batchNo,trackingId,status,category,purchaseDate,expiryDate,cost,assetcategoryId } = req.body;
      const categoryExists = await AssetCategoryModel.findOne({ uuid: { $in: assetcategoryId }});
  try {
    if(!categoryExists){
      res.status(404).json({success:false, data: "Asset category does not exits!" })
    }
    else if (categoryExists){
      const newAsset = new AssetModel({ asset_name, description,batchNo,trackingId,status,category,purchaseDate,expiryDate,cost });
      const savedAsset = await newAsset.save();


      categoryExists.asset.push(savedAsset._id);
    await categoryExists.save();


      res.status(201).json({ success: true, data: savedAsset });
    }    
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Assets
export const getAllAsset = async (req, res) => {
  try {
    const assets = await AssetModel.find();
    res.status(200).json({ success: true, data: assets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Asset by ID
export const getAssetById = async (req, res) => {
  try {
    const asset = await AssetModel.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ success: false, message: "Asset not found" });
    }
    res.status(200).json({ success: true, data: asset });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Asset
export const updateAsset = async (req, res) => {
  try {
    const updated = await AssetModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Asset not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete Asset (soft delete by default)
export const deleteAsset = async (req, res) => {
  try {
    const deleted = await AssetModel.findByIdAndUpdate(
      req.params.id,
      { is_deleted: true },
      { new: true }
    );
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Asset not found" });
    }
    res.status(200).json({ success: true, message: "Asset marked as deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// Create Asset Category
export const createAssetCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;

    // Validate asset IDs
    // const validAssets = await AssetModel.find({ _id: { $in: asset } });
    // if (validAssets.length !== asset.length) {
    //   return res.status(400).json({ success: false, message: "One or more Asset IDs are invalid" });
    // }

    const category = await AssetCategoryModel.find({ category_name: { $in: category_name }});
    if(category?.length){
      res.status(400).json({success:false,response:'category already exists'})
    }
    else{
      const newCategory = new AssetCategoryModel({ category_name, description });
      const savedCategory = await newCategory.save();
      res.status(201).json({ success: true, data: savedCategory });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get All Asset Categories
export const getAllAssetCategory = async (req, res) => {
  try {
    const categories = await AssetCategoryModel.find().populate("asset");
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Asset Category by ID
export const getAssetCategoryById = async (req, res) => {
  try {
    const category = await AssetCategoryModel.findById(req.params.id).populate("asset");
    if (!category) {
      return res.status(404).json({ success: false, message: "Asset category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Asset Category
export const updateAssetCategory = async (req, res) => {
  try {
    const { asset } = req.body;

    if (asset) {
      const validAssets = await AssetModel.find({ _id: { $in: asset } });
      if (validAssets.length !== asset.length) {
        return res.status(400).json({ success: false, message: "One or more Asset IDs are invalid" });
      }
    }

    const updated = await AssetCategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("asset");

    if (!updated) {
      return res.status(404).json({ success: false, message: "Asset category not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete Asset Category (soft delete by default)
export const deleteAssetCategory = async (req, res) => {
  try {
    const deleted = await AssetCategoryModel.findByIdAndUpdate(
      req.params.id,
      { is_deleted: true },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Asset category not found" });
    }

    res.status(200).json({ success: true, message: "Asset category marked as deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};











// export const deleteAsset = async (req, res) => {
//   try {
//     const assetId = req.params.id;

//     // Soft delete the asset
//     const deleted = await AssetModel.findByIdAndUpdate(
//       assetId,
//       { is_deleted: true },
//       { new: true }
//     );

//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "Asset not found" });
//     }

//     // Remove from category asset list
//     await AssetCategoryModel.updateMany(
//       { asset: assetId },
//       { $pull: { asset: assetId } }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Asset marked as deleted and unlinked from categories",
//       data: deleted,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };





//     // Update asset fields
//     const updatedAsset = await AssetModel.findByIdAndUpdate(
//       assetId,
//       { asset_name, description, batchNo, trackingId, status, category, purchaseDate, expiryDate, cost },
//       { new: true }
//     );

//     // Handle category reassignment
//     if (assetcategoryId) {
//       // Remove asset from any previous category
//       await AssetCategoryModel.updateMany(
//         { asset: assetId },
//         { $pull: { asset: assetId } }
//       );

//       // Add asset to the new category
//       const newCategory = await AssetCategoryModel.findOne({ uuid: assetcategoryId });
//       if (newCategory) {
//         newCategory.asset.push(assetId);
//         await newCategory.save();
//       }
//     }

//     res.status(200).json({ success: true, data: updatedAsset });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };
